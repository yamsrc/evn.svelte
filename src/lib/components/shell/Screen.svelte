<script lang="ts">
  import { cn } from '$lib/utils'
  import { standalone, safari, ios, shell } from '$lib/tools'
  import Underlay from './Underlay.svelte'
  import type { Props } from './Screen'

  const { children, unsafe = false, class: classes, underlay = true }: Props = $props()

  const iosStatusBarUnderlay = $derived(ios && safari && (standalone || shell) && underlay)
</script>

<div
  class={cn(
    'flex flex-col',
    standalone && safari ? 'min-h-screen' : 'min-h-dvh',
    unsafe ||
      'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]',
    classes,
  )}>
  <div class="flex-1 flex flex-col space-y-5 pt-2 tim:pt-0">
    {#if iosStatusBarUnderlay}
      <Underlay
        direction="top"
        class="fixed z-50 w-full top-0 h-[max(env(safe-area-inset-top),1rem)]" />
    {/if}
    {@render children()}
  </div>
</div>
