<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'
  import type { ClassValue, HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: ClassValue
    children: Snippet
  }

  const { class: classes, children, ...restProps }: Props = $props()
</script>

<div class={cn('space-y-5', classes)} role="group" {...restProps}>
  {@render children()}
</div>
