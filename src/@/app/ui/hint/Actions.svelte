<script lang="ts">
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
</script>

<div class="flex gap-2">
  {@render children()}
</div>
