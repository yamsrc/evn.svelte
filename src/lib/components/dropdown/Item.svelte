<script lang="ts" module>
  import { tv } from 'tailwind-variants'

  export const itemVariants = tv({
    base: 'font-bold [&_svg]:text-muted-foreground px-3.5 py-2.5',
    variants: {
      direction: {
        col: 'text-sm base w-full justify-start',
        row: 'text-xs flex-col gap-1 h-fit',
      },
    },
    defaultVariants: { direction: 'col' },
  })
</script>

<script lang="ts">
  import { Button } from '$ui/button'
  import { getGroupContext } from './GroupContext'
  import type { Props } from './Item'

  const { children, onclick, class: classes, variant = 'ghost', ...rest }: Props = $props()

  const direction = $derived(getGroupContext()?.direction ?? 'col')
</script>

<Button {onclick} {variant} class={[itemVariants({ direction }), classes]} {...rest}>
  {@render children?.()}
</Button>
