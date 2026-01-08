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

<div class={cn('space-y-5', classes)} role="group" {...restProps}>
  {@render children()}
</div>
