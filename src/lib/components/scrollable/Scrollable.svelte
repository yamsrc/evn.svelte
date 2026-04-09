<script lang="ts">
  import { onMount } from 'svelte'
  import { scrollable, INFINITY, type Props } from './Scrollable'

  const {
    children,
    infinite = false,
    align = 'start',
    bleed = false,
    class: classes,
    style,
    id,
    dir,
    scroll = 0,
    onscroll,
  }: Props = $props()

  const BLEED = 'mx-[calc(-50vw+50%)] px-[calc(50vw-50%)] scroll-px-[calc(50vw-50cqi)]'

  let mounted = $state(false)

  onMount(() => {
    mounted = true
  })
</script>

<div {dir} class="@container" {style}>
  <div
    {id}
    {@attach scrollable({ infinite, align, scroll }, mounted)}
    {onscroll}
    class={[
      'px-4 flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain *:shrink-0',
      bleed && BLEED,
      classes,
    ]}>
    {@render children?.()}
    {#if infinite}
      {#each { length: INFINITY - 1 }}
        {@render children?.()}
      {/each}
    {/if}
  </div>
</div>
