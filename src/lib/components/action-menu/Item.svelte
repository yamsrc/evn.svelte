<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Item'

  const { children, onclick, class: classes, variant = 'ghost', ...rest }: Props = $props()
</script>

<Button
  {onclick}
  {variant}
  class={[
    'font-normal',
    'group-data-[direction=col]:text-base',
    'group-data-[direction=col]:w-full',
    'group-data-[direction=col]:justify-start',
    'group-data-[direction=col]:px-3.5',
    'group-data-[direction=col]:py-2.5',
    'group-data-[direction=row]:text-xs',
    'group-data-[direction=row]:flex-col',
    'group-data-[direction=row]:gap-1',
    'group-data-[direction=row]:p-2',
    'group-data-[direction=row]:size-14',
    classes,
  ]}
  {...rest}>
  {@render children?.()}
</Button>
