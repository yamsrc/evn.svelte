<script lang="ts">
  import { ChevronsDownUp, Trash2 } from '@lucide/svelte'
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

  const { notifications, min = 3, max = 20, ondismiss, onclear }: Props = $props()

  const refs = $state<Array<Ref | undefined>>([])

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

  const visible = $derived(renderable.slice(0, max))

  let stack = $state<ReturnType<typeof Stack.Root> | undefined>()
</script>

<div class="space-y-2">
  {#if renderable.length > 0}
    <Stack.Root bind:this={stack} {min}>
      <Stack.Toolbar class="flex justify-between text-muted-foreground px-5">
        <Button variant="ghost" size="sm" onclick={onclearClick}>
          <Trash2 />
          {$dict.erase}
        </Button>
        <Button variant="ghost" size="sm" onclick={() => stack?.collapse()}>
          <ChevronsDownUp />
        </Button>
      </Stack.Toolbar>
      {#each visible as { notification, component }, i (notification.id)}
        <Stack.Item id={notification.id}>
          <Notification bind:this={refs[i]} {notification} {component} {ondismiss} />
        </Stack.Item>
      {/each}
    </Stack.Root>
  {/if}
</div>
