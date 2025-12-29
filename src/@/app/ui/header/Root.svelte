<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Root'

  const { children, class: classes }: Props = $props()
</script>

<header class={cn('flex justify-between items-center relative min-h-12', classes)}>
  {@render children?.()}
</header>
