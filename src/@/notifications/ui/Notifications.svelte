<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
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
  const GAP = 8
  const PEEK = 8

  const { notifications, limit = 5, ondismiss, onclear }: Props = $props()

  const refs = $state<Array<Ref | undefined>>([])
  let expanded = $state(false)
  let clearing = $state(false)
  const heightsById = $state<Record<string, number>>({})

  async function onclearClick(e: MouseEvent) {
    e.stopPropagation()
    clearing = true

    const removed = refs.map((ref, i) => delay(() => ref?.remove(), i * 50))

    await Promise.all(removed)

    onclear?.()
    void clear()
    clearing = false
  }

  function onexpand(e: MouseEvent | KeyboardEvent) {
    if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') return

    if (e.target instanceof HTMLElement && e.target.dataset.slot === 'notifications')
      expanded = !expanded
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
  const heights = $derived(visible.map(({ notification }) => heightsById[notification.id] || 0))
  const offset = (list: number[]) => list.reduce((s, h) => s + h + GAP, 0)
  const tops = $derived(heights.map((_, i) => offset(heights.slice(0, i))))
  const frontHeight = $derived(heights[0] || 0)

  const containerHeight = $derived(
    expanded
      ? Math.max(0, offset(heights) - GAP)
      : frontHeight + PEEK * Math.min(2, visible.length - 1),
  )
</script>

<div
  data-slot="notifications"
  class="space-y-2"
  onclick={onexpand}
  onkeydown={onexpand}
  role="button"
  tabindex="0"
  aria-label="Expand notifications">
  {#if renderable.length > 0}
    <div
      class={[
        'relative overflow-hidden',
        expanded && !clearing && 'transition-[height] duration-300',
        !expanded && 'pointer-events-none',
      ]}
      style:height={`${containerHeight}px`}>
      {#each visible as { notification, component }, i (notification.id)}
        {@const collapsed = !expanded && i > 0}
        {@const hidden = !expanded && i > 2}
        <div
          class={[
            'absolute inset-x-0 origin-bottom',
            expanded && !clearing && 'transition-[top,transform] duration-300 ease-out',
            hidden && 'opacity-0 pointer-events-none',
          ]}
          style:z-index={visible.length - i}
          style:top={expanded ? `${tops[i]}px` : '0'}
          style:transform={collapsed
            ? `translateY(${frontHeight - heights[i] + i * PEEK}px) scale(${1 - i * 0.05})`
            : undefined}
          role="presentation">
          <div bind:clientHeight={heightsById[notification.id]}>
            <Notification bind:this={refs[i]} {notification} {component} {ondismiss} />
          </div>
        </div>
      {/each}
    </div>
    {#if renderable.length > MIN_CLEARABLE_NOTIFICATIONS && expanded}
      <div class="flex justify-center">
        <Button variant="ghost" size="sm" onclick={onclearClick} class="text-muted-foreground">
          <Trash2 size={16} />
          {$dict.erase}
        </Button>
      </div>
    {/if}
  {/if}
</div>
