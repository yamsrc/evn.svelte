<script lang="ts">
  import type { Props } from './Row'

  const { children, class: classes, align = 'center' }: Props = $props()
</script>

<div
  class={[
    'w-full flex justify-between gap-3',
    align === 'start' ? 'items-start' : 'items-center',
    classes,
  ]}>
  {@render children()}
</div>
