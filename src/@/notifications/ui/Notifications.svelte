<script lang="ts">
  import { del } from '@/notifications'
  import Notification from './Notification.svelte'
  import { pick } from './components'
  import type { Props } from './Notifications'
  import type { NotificationComponentFor, NotificationWithComponent } from './components'

  type Renderable = {
    notification: NotificationWithComponent
    component: NotificationComponentFor<NotificationWithComponent>
  }

  const { notifications, limit = 5 }: Props = $props()

  async function ondismiss(id: string) {
    await del(id)
  }

  const renderable = $derived(
    notifications
      .map((notification): Renderable | null => {
        const component = pick(notification)

        if (!component) return null

        return { notification, component }
      })
      .filter((item): item is Renderable => item !== null),
  )
</script>

{#if renderable.length > 0}
  <div class="flex flex-col gap-2">
    {#each renderable.slice(0, limit) as { notification, component } (notification.id)}
      <Notification {notification} {component} {ondismiss} />
    {/each}
  </div>
{/if}
