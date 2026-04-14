<script lang="ts">
  import { transit } from '$lib/tools/transition'
  import { setContext } from './Context'
  import type { Props } from './Root'

  let { children, collapsed = $bindable(true), min = 3, class: classes }: Props = $props()

  let count = $state(0)
  const stacked = $derived(count >= min)

  setContext({
    id: crypto.randomUUID().slice(0, 8),
    increment: () => count++,
    decrement: () => count--,
    get collapsed() {
      return collapsed
    },
    get stacked() {
      return stacked
    },
  })

  export function toggle(on?: boolean) {
    if (on !== undefined) transit(() => (collapsed = on))
    else transit(() => (collapsed = !collapsed))
  }

  export function expand() {
    toggle(false)
  }

  export function collapse() {
    toggle(true)
  }

  function onclick(e: MouseEvent) {
    if (e.target === e.currentTarget) toggle()
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key !== 'Enter' && e.key !== ' ') return

    if (e.target === e.currentTarget) toggle()
  }
</script>

<div
  role="button"
  tabindex={0}
  class={['stack flex flex-col gap-2', collapsed && 'collapsed', stacked && 'stacked', classes]}
  {onclick}
  {onkeydown}>
  {@render children()}
</div>

<style>
  /* faster clip/opacity transition than move */
  :global(.stack > *:not(:first-child)) {
    transition:
      clip-path 100ms ease-out,
      opacity 100ms ease-out;
  }

  /* z-index always set for view transition */
  :global(.stack > *:nth-child(1)) {
    z-index: 5;
  }
  :global(.stack > *:nth-child(2)) {
    z-index: 4;
  }
  :global(.stack > *:nth-child(3)) {
    z-index: 3;
  }
  :global(.stack > *:nth-child(4)) {
    z-index: 2;
  }
  :global(.stack > *:nth-child(n + 5)) {
    z-index: 1;
  }

  :global(.stack.collapsed.stacked) {
    position: relative;
    overflow: hidden;
    padding-bottom: calc(var(--spacing) * 4);
    cursor: pointer;
  }

  :global(.stack.collapsed.stacked > *) {
    pointer-events: none;
  }

  :global(.stack.collapsed.stacked > *:first-child) {
    position: relative;
  }

  :global(.stack.collapsed.stacked > *:not(:first-child)) {
    position: absolute;
    inset: auto 0 calc(var(--spacing) * 4);
  }

  :global(.stack.collapsed.stacked > *:nth-child(2)) {
    transform: translateY(calc(var(--spacing) * 2)) scale(0.95);
    transform-origin: bottom center;
    clip-path: inset(calc(100% - var(--spacing) * 2) 0 0 0);
  }

  :global(.stack.collapsed.stacked > *:nth-child(3)) {
    transform: translateY(calc(var(--spacing) * 4)) scale(0.9);
    transform-origin: bottom center;
    clip-path: inset(calc(100% - var(--spacing) * 4) 0 0 0);
  }

  :global(.stack.collapsed.stacked > *:nth-child(n + 4)) {
    transform: translateY(calc(var(--spacing) * 4)) scale(0.85);
    transform-origin: bottom center;
    clip-path: inset(calc(100% - var(--spacing) * 4) 0 0 0);
    opacity: 0;
    pointer-events: none;
  }
</style>
