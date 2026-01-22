<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { del } from '@/notifications'
  import { dict } from '@/notifications/ui/intl'
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

  async function onclick() {
    await Promise.all(renderable.map(({ notification }) => del(notification.id)))
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

  const MIN_CLEARABLE_NOTIFICATIONS = 3
</script>

<div class="space-y-2">
  {#if renderable.length > 0}
    <div class="flex flex-col gap-2">
      {#each renderable.slice(0, limit) as { notification, component } (notification.id)}
        <Notification {notification} {component} {ondismiss} />
      {/each}
    </div>
    {#if renderable.length > MIN_CLEARABLE_NOTIFICATIONS}
      <div class="flex justify-center">
        <Button variant="ghost" size="sm" {onclick} class="text-muted-foreground">
          <Trash2 size={16} />
          {$dict.erase}
        </Button>
      </div>
    {/if}
  {/if}
</div>
