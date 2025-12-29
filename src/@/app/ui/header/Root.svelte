<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Root'

  const { title, actions, children, class: classes }: Props = $props()
</script>

<header class={cn('flex justify-between items-center relative min-h-12', classes)}>
  {#if title}
    <h1>{title}</h1>
  {:else}
    {@render children?.()}
  {/if}
  {#if actions}
    {@render actions()}
  {/if}
</header>
