<script lang="ts">
  import { onMount } from 'svelte'
  import { cn } from '$lib/utils'
  import { scrollable, INFINITY, type Props } from './Scrollable'

  const {
    children,
    infinite = false,
    align = 'start',
    class: classes,
    dir,
    scroll = 0,
    onscroll,
  }: Props = $props()

  let mounted = $state(false)

  onMount(() => {
    mounted = true
  })
</script>

<div {dir}>
  <div
    {@attach scrollable({ enabled: infinite, align, scroll }, mounted)}
    {onscroll}
    class={cn(
      'flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain',
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
