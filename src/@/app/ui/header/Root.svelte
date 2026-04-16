<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Root'

  const { children, class: classes }: Props = $props()
</script>

<header class={cn('flex justify-between items-start relative', classes)}>
  {@render children?.()}
</header>
