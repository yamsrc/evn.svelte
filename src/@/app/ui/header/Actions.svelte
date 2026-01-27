<script lang="ts">
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, class: classes, ...props }: HTMLAttributes<HTMLDivElement> = $props()
</script>

<div class={cn("flex items-center gap-2 [&_svg:not([class*='size-'])]:size-5", classes)} {...props}>
  {@render children?.()}
</div>
