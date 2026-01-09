<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'

  const { children, class: classes }: { children: Snippet; class?: string } = $props()
</script>

<section class={cn('px-5 max-w-[1440px] w-full mx-auto', classes)}>
  {@render children()}
</section>
