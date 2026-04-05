<script lang="ts">
  import type { Props } from './Overlay'

  const { children, class: classes }: Props = $props()
</script>

<div class={['absolute inset-0', classes]}>
  {@render children?.()}
</div>
