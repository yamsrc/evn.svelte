<script lang="ts">
  import { cn } from '$lib/utils'
  import type { ClassValue, HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: ClassValue
    children: Snippet
  }

  const { class: classes, children, ...rest }: Props = $props()
</script>

<div class={cn('flex flex-col items-center gap-6 w-full', classes)} {...rest}>
  {@render children()}
</div>
