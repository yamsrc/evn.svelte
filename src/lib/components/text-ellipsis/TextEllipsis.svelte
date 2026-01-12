<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './TextEllipsis'

  const { class: className, children, ...restProps }: Props = $props()
</script>

<span class={cn('overflow-hidden text-ellipsis whitespace-nowrap', className)} {...restProps}>
  {@render children?.()}
</span>
