<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Content'

  const { children, class: classes, ...props }: Props = $props()
  const ctx = getContext()
</script>

{#if !ctx.dismissing}
  <div class={['space-y-4', classes]} {...props}>
    {@render children()}
  </div>
{/if}
