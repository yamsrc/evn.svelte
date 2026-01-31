<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import type { Props } from './Slide'

  const { children, class: classes }: Props = $props()
</script>

<div class={['flex items-center gap-2 text-muted-foreground', classes]}>
  <div class="h-8 flex items-center -space-x-2.5">
    <ChevronLeft size={16} class="text-muted-foreground rtl:rotate-180" />
    <ChevronLeft size={16} class="text-muted-foreground/75 rtl:rotate-180" />
    <ChevronLeft size={16} class="text-muted-foreground/50 rtl:rotate-180" />
    <ChevronLeft size={16} class="text-muted-foreground/25 rtl:rotate-180" />
  </div>
  {@render children()}
</div>
