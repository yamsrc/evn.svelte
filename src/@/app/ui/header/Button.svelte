<script lang="ts">
  import { Button, type ButtonProps } from '$ui/button'

  const {
    children,
    size = 'icon',
    variant = 'outline',
    class: classes,
    ...rest
  }: ButtonProps = $props()
</script>

<Button class={classes} {size} {variant} {...rest}>
  {@render children?.()}
</Button>
