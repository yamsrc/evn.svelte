<script lang="ts">
  import { getContext } from 'svelte'
  import { STACK_CTX, type StackContext } from './Root'
  import type { Props } from './Footer'

  const { children, class: classes }: Props = $props()

  const ctx = getContext<StackContext>(STACK_CTX)
</script>

{#if ctx.expanded && ctx.stacked}
  <div style:view-transition-name="stack-footer" class={[classes]}>
    {@render children()}
  </div>
{/if}
