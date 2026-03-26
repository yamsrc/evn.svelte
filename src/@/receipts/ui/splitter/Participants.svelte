<script lang="ts">
  import { onMount } from 'svelte'
  import { Async } from 'svas'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Button } from '$ui/button'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Scrollable } from '$com/scrollable'
  import type { Props } from './Participants'

  let { receipt, account, actor = $bindable('') }: Props = $props()

  // current user first
  const identities = $derived(receipt.identities.toSorted((a, b) => (a === account.id ? -1 : 1)))

  function select(identity: string) {
    actor = identity
  }

  let mounted = $state(false)

  onMount(() => (mounted = true))
</script>

<Scrollable bleed id="favorites-list-content" class="gap-1 py-1">
  {#each identities as identity (identity)}
    {@const selected = identity === actor}
    <Button
      variant="outline"
      class={[
        'min-w-20 max-w-32 h-20 flex flex-col items-center justify-center',
        'disabled:opacity-100',
        selected && 'bg-accent! ring-2 ring-accent-foreground/20',
        mounted && 'starting:scale-0 duration-300',
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
