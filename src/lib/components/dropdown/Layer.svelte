<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Layer'

  const { name = '', children }: Props = $props()
  const ctx = getContext()
</script>

{#if ctx.layer === name}
  {@render children()}
{/if}
