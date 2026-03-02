<script lang="ts">
  import type { Props } from './Group'

  const { children, direction, class: classes }: Props = $props()
</script>

<div
  class={[
    'w-full flex gap-1 group text-base font-normal',
    direction === 'row' ? 'flex-row justify-around text-sm' : 'flex-col',
    classes,
  ]}
  data-direction={direction ?? 'col'}>
  {@render children()}
</div>
