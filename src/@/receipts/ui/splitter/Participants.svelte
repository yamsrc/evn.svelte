<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import { onMount } from 'svelte'
  import { Async } from 'svas'
  import { CircleCheck } from '@lucide/svelte'
  import { leave } from '@/receipts'
  import { Coins } from '@/app/ui'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Button } from '$ui/button'
  import { styles, transit } from '$lib/tools'
  import { Ellipsis } from '$com/text'
  import { Scrollable } from '$com/scrollable'
  import { dict } from '../intl'
  import { sign, type Props } from './Participants'

  let { receipt, stats, account, actor = $bindable(''), class: classes }: Props = $props()

  // current user first
  const identities = $derived(receipt.identities.toSorted((a) => (a === account.id ? -1 : 1)))

  function select(identity: string) {
    transit(() => (actor = identity))
  }

  const removing = new SvelteSet<string>()

  export function remove(): boolean {
    const victim = actor

    removing.add(victim)
    actor = account.id

    void leave(receipt.id, victim).finally(() => removing.delete(victim))

    return victim === account.id
  }

  let mounted = $state(false)

  onMount(() => (mounted = true))

  const style = styles('receipts-participants')
</script>

<Scrollable bleed class={['gap-1 pt-1 pb-8', classes]} style={$style}>
  {#each identities as identity (identity)}
    {@const selected = identity === actor}
    {@const cost = stats.portions[identity]?.total ?? 0}
    <Button
      variant="outline"
      class={[
        'relative',
        'min-w-20 max-w-32 h-fit flex flex-col items-center justify-center gap-1',
        'disabled:opacity-100 transition-all',
        selected && 'selected',
        mounted && 'starting:scale-0 duration-300',
        removing.has(identity) && 'scale-0 duration-150',
      ]}
      disabled={identity === actor}
      onclick={() => select(identity)}>
      <Async store={accounts.get(identity)}>
        {#snippet awaited(participant)}
          <Avatar account={participant} />
          <Ellipsis>
            {#if identity === account.id}
              {$dict.me}
            {:else}
              {participant.name}
            {/if}
          </Ellipsis>
        {/snippet}
      </Async>
      <div class="absolute top-1 right-1">
        {#if receipt.done[identity] === true}
          <CircleCheck
            class={[
              'bg-constructive text-constructive-foreground rounded-full',
              mounted && 'starting:scale-0 duration-150',
            ]} />
        {/if}
      </div>
      <div
        class={[
          'absolute -bottom-8',
          'py-1 px-2 rounded-lg bg-background border border-muted-foreground/20',
          'text-xs',
        ]}>
        <Coins amount={cost} sign={sign(receipt, identity)} />
      </div>
    </Button>
  {/each}
</Scrollable>
