<script lang="ts">
  import type { Props } from './Group'

  const { children, class: classes }: Props = $props()
</script>

<div class={['w-full flex flex-col gap-1', classes]}>
  {@render children()}
</div>
