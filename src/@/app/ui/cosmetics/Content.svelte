<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string
    children: Snippet
  }

  const { class: classes, children, ...restProps }: Props = $props()
</script>

<div class={cn('flex flex-col items-center gap-6', classes)} {...restProps}>
  {@render children()}
</div>
