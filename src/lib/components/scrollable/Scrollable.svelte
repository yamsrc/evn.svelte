<script lang="ts">
  import { cn } from '$lib/utils'
  import { infinity, INFINITY, type Props } from './Scrollable'

  const {
    children,
    infinite = false,
    align = 'start',
    class: classes,
    dir,
    scroll = 0,
    onscroll,
  }: Props = $props()
</script>

<div {dir}>
  <div
    {@attach infinity({ enabled: infinite, align, scroll })}
    {onscroll}
    class={cn(
      'px-4 flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain',
      classes,
    )}
  >
    {@render children?.()}
    {#if infinite}
      {#each { length: INFINITY - 1 }}
        {@render children?.()}
      {/each}
    {/if}
  </div>
</div>
