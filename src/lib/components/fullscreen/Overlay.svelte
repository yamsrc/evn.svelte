<script lang="ts">
  import type { Props } from './Overlay'

  const { children, class: classes }: Props = $props()
</script>

<div class={['absolute inset-0', classes]} style="view-transition-name: fullscreen-overlay;">
  {@render children?.()}
</div>

<style>
  ::view-transition-group(fullscreen-overlay) {
    z-index: 4;
  }
</style>
