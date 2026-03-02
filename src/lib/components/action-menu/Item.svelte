<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Item'

  const { children, onclick, class: classes, variant = 'ghost', size, ...rest }: Props = $props()
</script>

<Button
  {onclick}
  {variant}
  class={[
    'px-3.5 has-[>svg]:px-3.5 py-2.5',
    'group-data-[direction=col]:w-full group-data-[direction=col]:justify-start',
    'group-data-[direction=row]:flex-col group-data-[direction=row]:gap-1',
    size === 'lg' ? 'text-base font-normal' : 'text-xs font-normal',
    classes,
  ]}
  {...rest}>
  {@render children?.()}
</Button>
