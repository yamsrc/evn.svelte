<script lang="ts">
  import { transit } from '$lib/tools/svt'
  import type { Props } from './Stack'

  let { children, expanded = $bindable(false), min = 3, class: classes }: Props = $props()

  let count = $state(0)

  const stacked = $derived(count >= min)
  const collapsed = $derived(stacked && !expanded)

  function stackItems(node: HTMLElement) {
    const update = () => {
      const items = node.children

      count = items.length

      for (let i = 0; i < count; i++) {
        const child = items[i] as HTMLElement

        child.style.viewTransitionName = `stack-${i}`
        child.style.viewTransitionClass = 'stack-item'
        child.style.zIndex = String(count - i)
      }
    }

    update()

    const observer = new MutationObserver(update)

    observer.observe(node, { childList: true })

    return { destroy: () => observer.disconnect() }
  }

  export function toggle() {
    transit(() => (expanded = !expanded))
  }

  export function expand() {
    transit(() => (expanded = true))
  }

  export function collapse() {
    transit(() => (expanded = false))
  }
</script>

<div use:stackItems class={['flex flex-col gap-2', collapsed && 'collapsed', classes]}>
  {@render children()}
</div>

<style>
  .collapsed {
    position: relative;
    overflow: hidden;
    padding-bottom: calc(var(--spacing) * 4);
    pointer-events: none;
  }

  .collapsed > :global(*:first-child) {
    position: relative;
  }

  .collapsed > :global(*:not(:first-child)) {
    position: absolute;
    inset: auto 0 calc(var(--spacing) * 4);
  }

  .collapsed > :global(*:nth-child(2)) {
    transform: translateY(calc(var(--spacing) * 2)) scale(0.95);
    transform-origin: bottom center;
    clip-path: inset(calc(100% - var(--spacing) * 2) 0 0 0);
  }

  .collapsed > :global(*:nth-child(3)) {
    transform: translateY(calc(var(--spacing) * 4)) scale(0.9);
    transform-origin: bottom center;
    clip-path: inset(calc(100% - var(--spacing) * 4) 0 0 0);
  }

  .collapsed > :global(*:nth-child(n + 4)) {
    opacity: 0;
    pointer-events: none;
  }

  :global(::view-transition-group(*.stack-item)) {
    animation-duration: 300ms;
    animation-timing-function: ease-out;
  }
</style>
