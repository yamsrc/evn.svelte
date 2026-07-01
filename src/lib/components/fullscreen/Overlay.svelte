<script lang="ts">
  import type { Props } from './Overlay'

  const { children, class: classes }: Props = $props()
</script>

<!-- transparent to gestures (tap-to-close / pinch on content below); only the controls inside capture -->
<div
  class={['absolute inset-0 pointer-events-none *:pointer-events-auto', classes]}
  style="view-transition-name: fullscreen-overlay;">
  {@render children?.()}
</div>

<style>
  ::view-transition-group(fullscreen-overlay) {
    z-index: 4;
  }
</style>
