<script lang="ts">
  import { del } from '@/notifications'
  import Notification from './Notification.svelte'
  import { components } from './components'
  import type { Props } from './Notifications'

  const { notifications, limit = 5 }: Props = $props()

  async function ondismiss(id: string) {
    await del(id)
  }

  const renderable = $derived(
    notifications
      .map((notification) => {
        const domainComponents = components[notification.domain] as
          | Record<string, unknown>
          | undefined

        const component = domainComponents?.[notification.event] as any

        return component ? { notification, component } : null
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  )
</script>

<div class="flex flex-col gap-2">
  {#if renderable.length > 0}
    <div class="flex flex-col gap-2">
      {#each renderable.slice(0, limit) as { notification, component } (notification.id)}
        <Notification {notification} {component} {ondismiss} />
      {/each}
    </div>
  {/if}
</div>
