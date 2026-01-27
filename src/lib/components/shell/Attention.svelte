<script lang="ts">
  import type { Props } from './Attention'

  const { id, class: classes }: Props = $props()
</script>

<div
  {id}
  class={['size-2 rounded-full bg-constructive', classes]}
  style={id ? `view-transition-name: ${id};` : undefined}>
</div>
