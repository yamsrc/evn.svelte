<script lang="ts">
  import { cn } from '$lib/utils'
  import { Button, type ButtonProps } from '$ui/button'

  const {
    children,
    size = 'icon',
    variant = 'secondary',
    class: classes,
    ...rest
  }: ButtonProps = $props()
</script>

<Button class={cn('size-12 bg-accent/50 border border-border', classes)} {size} {variant} {...rest}>
  {@render children?.()}
</Button>
