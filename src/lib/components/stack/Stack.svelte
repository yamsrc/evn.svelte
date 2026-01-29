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

  const GAP = 8
  const PEEK = 8
  const SCALE_STEP = 0.05

  let {
    items,
    key,
    children,
    expanded = $bindable(false),
    min = 3,
    class: className,
  }: Props = $props()

  const heightsByKey = $state<Record<string | number, number>>({})

  const count = $derived(items.length)
  const stacked = $derived(count >= min)
  const peekCount = $derived(Math.min(2, count - 1))

  const heights = $derived(items.map((item) => heightsByKey[key(item)] || 0))
  const frontHeight = $derived(heights[0] || 0)
  const tops = $derived(heights.map((_, i) => heights.slice(0, i).reduce((s, h) => s + h + GAP, 0)))

  const containerHeight = $derived(
    expanded
      ? Math.max(0, heights.reduce((s, h) => s + h + GAP, 0) - GAP)
      : frontHeight + PEEK * peekCount,
  )

  function getTransform(i: number): string | undefined {
    if (expanded || i === 0) return undefined

    return `translateY(${frontHeight - heights[i] + i * PEEK}px) scale(${1 - i * SCALE_STEP})`
  }

  function getContext(i: number): StackContext {
    return {
      index: i,
      collapsed: stacked && !expanded && i > 0,
      hidden: stacked && !expanded && i > 2,
    }
  }

  export function toggle() {
    expanded = !expanded
  }

  export function expand() {
    expanded = true
  }

  export function collapse() {
    expanded = false
  }
</script>

{#if stacked}
  <div
    class={['stack', expanded && 'stack--expanded', className]}
    style:height="{containerHeight}px">
    {#each items as item, i (key(item))}
      {@const ctx = getContext(i)}
      <div
        class={['stack__item', ctx.hidden && 'stack__hidden']}
        style:z-index={count - i}
        style:top={expanded ? `${tops[i]}px` : '0'}
        style:transform={stacked && !expanded ? getTransform(i) : undefined}
        role="presentation">
        <div bind:clientHeight={heightsByKey[key(item)]}>
          {@render children(item, ctx)}
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class={['stack-flat', className]}>
    {#each items as item, i (key(item))}
      {@render children(item, getContext(i))}
    {/each}
  </div>
{/if}

<style>
  .stack {
    position: relative;
    overflow: hidden;
    transition: height 300ms;
  }

  .stack:not(.stack--expanded) {
    pointer-events: none;
  }

  .stack__item {
    position: absolute;
    inset-inline: 0;
    transform-origin: bottom center;
    transition:
      top 300ms ease-out,
      transform 300ms ease-out;
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
</style>
