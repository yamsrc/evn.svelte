<script lang="ts" module>
  import { tv } from 'tailwind-variants'

  export const itemVariants = tv({
    base: 'font-bold [&_svg]:text-muted-foreground px-3.5 py-2.5 dark:hover:bg-muted-foreground/20 leading-none',
    variants: {
      direction: {
        col: 'justify-start',
        row: "flex-col gap-2 h-fit [&_svg:not([class*='size-'])]:size-5 w-min min-w-20 whitespace-normal",
      },
    },
    defaultVariants: { direction: 'col' },
  })
</script>

<script lang="ts">
  import { Button } from '$ui/button'
  import { getGroupContext } from './GroupContext'
  import { getContext } from './Context'
  import type { Props } from './Item'

  const { children, onclick, layer, class: classes, variant = 'ghost', ...rest }: Props = $props()
  const ctx = getContext()

  const click = $derived(layer ? () => ctx.push(layer) : onclick)
  const direction = $derived(getGroupContext()?.direction ?? 'col')
</script>

<Button onclick={click} {variant} class={[itemVariants({ direction }), classes]} {...rest}>
  {@render children?.()}
</Button>
