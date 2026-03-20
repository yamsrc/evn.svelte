<script lang="ts">
  import { Async } from 'svas'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import type { Props } from './Avatars'

  const { identities, max = 4, class: classes }: Props = $props()

  const visible = $derived(identities.slice(0, max))
  const remaining = $derived(identities.length - visible.length)
</script>

<div class={['flex items-center min-h-8', classes]}>
  {#if identities.length}
    <div class="flex -space-x-2">
      {#each visible as identity (identity)}
        <Async store={accounts.get(identity)}>
          {#snippet awaited(account)}
            <Picture {account} class="size-8 ring-2 ring-card shrink-0" />
          {/snippet}
        </Async>
      {/each}
    </div>
    {#if remaining > 0}
      <span class="ms-2">+{remaining}</span>
    {/if}
  {/if}
</div>
