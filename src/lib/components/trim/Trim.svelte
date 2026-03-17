<script lang="ts">
  import { type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, ...props }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props()
</script>

<span style="text-box: cap text;" {...props}>
  {@render children?.()}
</span>
