<script lang="ts">
  import type { Props } from './Overlay'

  const { children, class: classes }: Props = $props()
</script>

<div data-slot="fullscreen-overlay" class={['absolute inset-0', classes]}>
  {@render children?.()}
</div>

<style>
  :global(body:has([data-slot='fullscreen-overlay'])) :global(.shell-navigation) {
    display: none;
  }
</style>
