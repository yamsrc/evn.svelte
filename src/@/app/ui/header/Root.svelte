<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Root'

  const { title, actions, class: classes }: Props = $props()
</script>

<header class={cn('flex justify-between items-center relative', classes)}>
  <h1>{title}</h1>
  {#if actions}
    {@render actions()}
  {/if}
</header>
