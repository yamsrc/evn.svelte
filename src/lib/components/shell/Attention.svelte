<script lang="ts">
  import type { Props } from './Attention'

  const { id, class: classes }: Props = $props()
</script>

<div
  {id}
  class={['size-2 rounded-full bg-constructive shrink-0', classes]}
  style={id ? `view-transition-name: ${id}; view-transition-class: attention;` : undefined}>
</div>
