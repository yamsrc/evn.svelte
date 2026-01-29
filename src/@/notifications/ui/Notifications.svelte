<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import * as Stack from '$lib/components/stack'
  import { delay } from '$lib/tools'
  import { Button } from '$ui/button'
  import { clear } from '@/notifications'
  import { dict } from '@/notifications/ui/intl'
  import Notification from './Notification.svelte'
  import { pick } from './components'
  import type { Props } from './Notifications'
  import type { ComponentFor, WithComponent } from './components'

  type Renderable = {
    notification: WithComponent
    component: ComponentFor<WithComponent>
  }

  type Ref = { remove: () => Promise<void> | void }

  const MIN_CLEARABLE_NOTIFICATIONS = 3

  const { notifications, limit = 5, ondismiss, onclear }: Props = $props()

  const refs = $state<Array<Ref | undefined>>([])
  let expanded = $state(false)

  async function onclearClick(e: MouseEvent) {
    e.stopPropagation()

    const removed = refs.map((ref, i) => delay(() => ref?.remove(), i * 50))

    await Promise.all(removed)

    onclear?.()
    void clear()
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

  const visible = $derived(renderable.slice(0, limit))
</script>

<div class="space-y-2">
  {#if renderable.length > 0}
    <Stack.Root bind:expanded min={MIN_CLEARABLE_NOTIFICATIONS}>
      {#each visible as { notification, component }, i (notification.id)}
        <Stack.Item id={notification.id}>
          <Notification bind:this={refs[i]} {notification} {component} {ondismiss} />
        </Stack.Item>
      {/each}
      <Stack.Footer class="flex justify-center">
        <Button variant="ghost" size="sm" onclick={onclearClick} class="text-muted-foreground">
          <Trash2 size={16} />
          {$dict.erase}
        </Button>
      </Stack.Footer>
    </Stack.Root>
  {/if}
</div>
