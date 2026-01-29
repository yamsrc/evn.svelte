<script lang="ts">
  import { setContext } from 'svelte'
  import { transit } from '$lib/tools/svt'
  import { STACK_CTX, type Props, type StackContext } from './Root'

  let { children, expanded = $bindable(false), min = 3, class: classes }: Props = $props()

  let count = $state(0)

  const collapsed = $derived(!expanded)
  const stacked = $derived(count >= min)

  setContext<StackContext>(STACK_CTX, {
    increment: () => count++,
    decrement: () => count--,
  })

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

<div class={['stack flex flex-col gap-2', collapsed && 'collapsed', stacked && 'stacked', classes]}>
  {@render children()}
</div>

<style>
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
    opacity: 0;
    pointer-events: none;
  }

  :global(::view-transition-group(*.stack-item)) {
    animation-duration: 300ms;
    animation-timing-function: ease-out;
  }
</style>
