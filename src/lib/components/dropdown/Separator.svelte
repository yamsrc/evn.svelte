<script lang="ts">
  import type { Props } from './Separator'

  const { children }: Props = $props()
</script>

<div class="flex items-center justify-stretch gap-1">
  {#if children}
    <div class="bg-border my-2 h-px w-3.5"></div>
    <span class="text-muted-foreground text-xs font-bold">{@render children?.()}</span>
  {/if}
  <div class="bg-border my-2 h-px w-full"></div>
</div>
