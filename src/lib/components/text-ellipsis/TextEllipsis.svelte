<script lang="ts">
  import type { Props } from './TextEllipsis'

  const { class: className, children, ...restProps }: Props = $props()
</script>

<span
  class={['inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap', className]}
  {...restProps}>
  {@render children?.()}
</span>
