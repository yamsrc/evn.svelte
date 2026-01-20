<script lang="ts">
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import type { Props } from './Action'

  const {
    children,
    size = 'icon-lg',
    variant = 'outline',
    class: classes,
    ...props
  }: Props = $props()
</script>

<Button
  {size}
  {variant}
  class={cn(
    "size-14 [&_svg:not([class*='size-'])]:size-5 [&_span]:hidden sm:[&_span]:inline",
    classes,
  )}
  {...props}>
  {@render children?.()}
</Button>
