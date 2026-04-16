<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Header'

  const { children, class: classes }: Props = $props()
</script>

<header
  class={cn(
    'sticky top-0 left-0 right-0 z-50',
    'pt-[env(safe-area-inset-top)] standalone:pt-[max(env(safe-area-inset-top),0.5rem)] -mt-[env(safe-area-inset-top)]',
    'bg-linear-to-b from-background to-background/50 backdrop-filter backdrop-blur-sm text-foreground',
    classes,
  )}>
  <div class="flex justify-between items-start py-2 standalone:pt-0">
    {@render children()}
  </div>
</header>
