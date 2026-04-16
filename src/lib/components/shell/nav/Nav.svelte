<script lang="ts">
  import { cn } from '$lib/utils'
  import { ios, safari, shell, standalone } from '$lib/tools'
  import { Underlay } from '$com/shell'
  import { page } from '$app/state'
  import { returns } from './store'
  import Toolbar from './Toolbar.svelte'
  import Sections from './Sections.svelte'
  import { match } from './Nav'
  import Bar from './Bar.svelte'
  import Back from './Back.svelte'
  import type { Props } from './Nav'

  const app = standalone || shell
  const safariBrowser = ios && safari && !app

  const { sections = [], position = 'start', underlay = false, class: classes }: Props = $props()

  const section = $derived(sections.find((s) => match(s, page.url.pathname)))
  const ret = $derived($returns.at(-1) ?? null)
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class={[
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
    <Bar>
      {#if ret}
        <Back {ret} {section} />
      {:else}
        <Sections {sections} {section} />
      {/if}
    </Bar>
    <Toolbar {position} />
  </div>
</nav>

<style>
  ::view-transition-group(shell-nav-underlay) {
    z-index: 1;
  }
</style>
