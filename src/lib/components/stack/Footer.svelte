<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Footer'

  const { children, class: classes }: Props = $props()
  const ctx = getContext()
</script>

{#if !ctx.collapsed && ctx.stacked}
  <div style:view-transition-name="stack-footer" class={[classes]}>
    {@render children()}
  </div>
{/if}
