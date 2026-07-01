<script lang="ts">
  import { zoom } from './action'
  import type { Props } from './Zoom'

  const { children, open = false }: Props = $props()
</script>

<!-- touch-none + callout-off: take over native gestures so only the image zooms (see ./action) -->
<div
  use:zoom={{ open }}
  class="flex items-center justify-center size-full overflow-hidden touch-none select-none [&_img]:max-h-full [&_img]:max-w-full [&_img]:h-auto [&_img]:w-auto"
  style="-webkit-touch-callout: none;">
  {@render children()}
</div>
