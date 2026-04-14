<script lang="ts">
  import { cn } from '$lib/utils'
  import { ios, safari, shell, standalone } from '$lib/tools'
  import { Underlay } from '$com/shell'
  import Toolbar from './Toolbar.svelte'
  import Bar from './Bar.svelte'
  import type { Props } from './Nav'

  const app = standalone || shell
  const safariBrowser = ios && safari && !app

  const { sections = [], position = 'start', underlay = false, class: classes }: Props = $props()
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class={[
    'shell-navigation',
    'fixed max-w-3xl mx-auto my-0',
    'bottom-[env(safe-area-inset-bottom)] standalone:bottom-[max(env(safe-area-inset-bottom),1rem)]',
    'left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)]',
    classes,
  ]}>
  {#if underlay}
    <Underlay
      direction="bottom"
      class="absolute -z-1 inset-0 -top-6 -bottom-[max(env(safe-area-inset-bottom),1rem)] mx-[calc(-50vw+50%)]"
      style="view-transition-name: shell-nav-underlay;" />
  {/if}
  <div
    class={cn(
      'flex items-center gap-2',
      'h-21 standalone:h-16 p-5 pt-0 sm:pb-6 standalone:px-6 standalone:pb-0',
      app && 'h-16 pb-0',
      safariBrowser && 'h-18 pb-[6px]', // min 6px from bottom edge to keep safari navbar transparent
      position === 'center' ? 'justify-center' : 'justify-between',
      position === 'start' ? 'flex-row' : 'flex-row-reverse',
    )}>
    <Bar {sections} />
    <Toolbar {position} />
  </div>
</nav>

<style>
  ::view-transition-group(shell-nav-underlay) {
    z-index: 1;
  }
</style>
