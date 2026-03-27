<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import { onMount } from 'svelte'
  import { Async } from 'svas'
  import { leave } from '@/receipts'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Button } from '$ui/button'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Scrollable } from '$com/scrollable'
  import type { Props } from './Participants'

  let { receipt, account, actor = $bindable(''), class: classes }: Props = $props()

  // current user first
  const identities = $derived(receipt.identities.toSorted((a, b) => (a === account.id ? -1 : 1)))

  function select(identity: string) {
    actor = identity
  }

  const removing = new SvelteSet<string>()

  export function remove() {
    const victim = actor

    removing.add(victim)

    // optimistic
    void leave(receipt.id, victim).finally(() => removing.delete(victim))

    actor = account.id

    return victim === account.id
  }

  let mounted = $state(false)

  onMount(() => (mounted = true))
</script>

<Scrollable bleed class={['gap-1 py-1', classes]}>
  {#each identities as identity (identity)}
    {@const selected = identity === actor}
    <Button
      variant="outline"
      class={[
        'min-w-20 max-w-32 h-20 flex flex-col items-center justify-center',
        'disabled:opacity-100 transition-all',
        selected && 'bg-accent! ring-2 ring-accent-foreground/20',
        mounted && 'starting:scale-0 duration-300',
        removing.has(identity) && 'scale-0 duration-150',
      ]}
      disabled={identity === actor}
      onclick={() => select(identity)}>
      <Async store={accounts.get(identity)}>
        {#snippet awaited(account)}
          <Avatar {account} />
          <TextEllipsis>{account.name}</TextEllipsis>
        {/snippet}
      </Async>
    </Button>
  {/each}
</Scrollable>
