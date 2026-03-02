<script lang="ts" module>
  import { tv } from 'tailwind-variants'

  export const itemVariants = tv({
    base: 'font-normal',
    variants: {
      direction: {
        col: 'text-base w-full justify-start px-3.5 py-2.5',
        row: 'text-xs flex-col gap-1 p-2 size-14',
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

<Button
  {onclick}
  {variant}
  class={[itemVariants({ direction }), classes]}
  {...rest}>
  {@render children?.()}
</Button>
