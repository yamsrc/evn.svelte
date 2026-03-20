<script lang="ts">
  import type { Props } from './TextEllipsis'

  const { class: classes, children, ...restProps }: Props = $props()
</script>

<span
  class={['inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap', classes]}
  {...restProps}>
  {@render children?.()}
</span>
