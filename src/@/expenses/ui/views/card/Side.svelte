<script lang="ts">
  import type { Props } from './Side'

  const { children, class: classes, align = 'start' }: Props = $props()
</script>

<div
  class={[
    'flex flex-col gap-1 min-w-0',
    align === 'end' ? 'items-end text-end' : 'items-start text-start',
    classes,
  ]}>
  {@render children()}
</div>
