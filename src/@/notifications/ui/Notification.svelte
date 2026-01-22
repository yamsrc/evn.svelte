<script lang="ts">
  import { Async } from 'svas'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { groups } from '@/groups'
  import type { Props } from './Notification'

  const { notification, ondismiss }: Props = $props()

  let container: HTMLDivElement
  let hasDismissed = false

  function handleScrollEnd() {
    if (!container || hasDismissed) return

    const maxLeft = container.scrollWidth - container.clientWidth

    if (container.scrollLeft >= maxLeft - 1) {
      hasDismissed = true
      ondismiss?.(notification.id)
    }
  }
</script>

<div class="relative overflow-hidden rounded-lg">
  <div
    bind:this={container}
    class="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
    onscrollend={handleScrollEnd}>
    <div class="w-full shrink-0 snap-start bg-card border border-border rounded-lg p-4">
      {#if notification.domain === 'accounts' && notification.event === 'created'}
        <div class="text-sm">Welcome to the app!</div>
      {:else if notification.domain === 'groups' && notification.event === 'joined' && notification.key}
        <Async store={groups}>
          {#snippet awaited(groups)}
            {@const group = groups.find((g) => g.id === notification.key)}
            {#if group}
              {@const inviterIdentity = notification.payload?.identities?.[0] as string | undefined}
              <div class="flex items-center gap-3">
                {#if inviterIdentity}
                  <Async store={accounts.get(inviterIdentity)}>
                    {#snippet awaited(inviterAccount)}
                      <Picture account={inviterAccount} class="size-8 shrink-0" />
                      <div class="text-sm">
                        <span class="font-medium">{inviterAccount.name}</span>
                        <span class="ml-1">added you to</span>
                        <span class="font-medium ml-1">{group.name}</span>
                      </div>
                    {/snippet}
                  </Async>
                {:else}
                  <div class="text-sm">
                    <span>You've been added to</span>
                    <span class="font-medium ml-1">{group.name}</span>
                  </div>
                {/if}
              </div>
            {/if}
          {/snippet}
        </Async>
      {/if}
    </div>
    <div class="w-full shrink-0 snap-end" aria-hidden="true"></div>
  </div>
</div>
