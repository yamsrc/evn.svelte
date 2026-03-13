<script lang="ts">
  import { getContext } from './Context'
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
  const ctx = getContext()
</script>

{#if !ctx.dismissing}
  {@render children()}
{/if}
