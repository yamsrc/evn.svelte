<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Separator'

  const { children, class: classes }: Props = $props()
  const lineClass = 'h-[2px] flex-1 bg-border'
</script>

<div class={cn('flex w-full items-center', children && 'gap-3', classes)}>
  <span class={lineClass}></span>
  {#if children}
    <span class="whitespace-nowrap text-sm uppercase">
      {@render children?.()}
    </span>
  {/if}
  <span class={lineClass}></span>
</div>
