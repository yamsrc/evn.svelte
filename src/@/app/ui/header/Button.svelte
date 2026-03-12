<script lang="ts">
  import { Button, type ButtonProps } from '$ui/button'
  import { cn } from '$lib/utils'

  const {
    children,
    size = 'icon',
    variant = 'outline',
    class: classes,
    ...rest
  }: ButtonProps = $props()
</script>

<Button class={cn("[&_svg:not([class*='size-'])]:size-5", classes)} {size} {variant} {...rest}>
  {@render children?.()}
</Button>
