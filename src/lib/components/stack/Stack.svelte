<script lang="ts" generics="T">
  import type { StackContext } from './Stack'
  import type { Snippet } from 'svelte'

  interface Props {
    items: T[]
    key: (item: T) => string | number
    children: Snippet<[T, StackContext]>
    expanded?: boolean
    min?: number
    class?: string
  }

  let {
    items,
    key,
    children,
    expanded = $bindable(false),
    min = 3,
    class: className,
  }: Props = $props()

  const count = $derived(items.length)
  const stacked = $derived(count >= min)

  function withTransition(fn: () => void) {
    if (!document.startViewTransition) return fn()

    document.startViewTransition(fn)
  }

  export function toggle() {
    withTransition(() => (expanded = !expanded))
  }

  export function expand() {
    withTransition(() => (expanded = true))
  }

  export function collapse() {
    withTransition(() => (expanded = false))
  }
</script>

{#if stacked}
  <div class={['stack', expanded && 'stack--expanded', className]}>
    {#each items as item, i (key(item))}
      {@const hidden = !expanded && i > 2}
      <div
        class={['stack__item', i === 0 && 'stack__item--front', hidden && 'stack__hidden']}
        style:view-transition-name="stack-{key(item)}"
        style:z-index={count - i}>
        {@render children(item, { index: i, collapsed: !expanded && i > 0, hidden })}
      </div>
    {/each}
  </div>
{:else}
  <div class={['stack-flat', className]}>
    {#each items as item, i (key(item))}
      <div style:view-transition-name="stack-{key(item)}">
        {@render children(item, { index: i, collapsed: false, hidden: false })}
      </div>
    {/each}
  </div>
{/if}

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stack:not(.stack--expanded) {
    position: relative;
    overflow: hidden;
    padding-bottom: 16px;
    pointer-events: none;
  }

  .stack__item {
    transform-origin: bottom center;
  }

  .stack__item--front {
    position: relative;
  }

  .stack:not(.stack--expanded) > .stack__item:not(:first-child) {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
  }

  .stack:not(.stack--expanded) > .stack__item:nth-child(2) {
    transform: translateY(8px) scale(0.95);
    clip-path: inset(calc(100% - 8px) 0 0 0);
  }

  .stack:not(.stack--expanded) > .stack__item:nth-child(3) {
    transform: translateY(16px) scale(0.9);
    clip-path: inset(calc(100% - 16px) 0 0 0);
  }

  .stack__hidden {
    opacity: 0;
    pointer-events: none;
  }

  .stack-flat {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :global(::view-transition-old(stack-*)),
  :global(::view-transition-new(stack-*)) {
    animation-duration: 300ms;
    animation-timing-function: ease-out;
  }

  :global(::view-transition-group(stack-*)) {
    z-index: auto;
  }
</style>
