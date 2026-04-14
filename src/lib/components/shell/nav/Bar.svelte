<script lang="ts">
  import { derived } from 'svelte/store'
  import { ChevronLeft } from '@lucide/svelte'
  import { back } from '$com/history'
  import { page } from '$app/state'
  import { actions, returns } from './store'
  import Sections from './Sections.svelte'
  import { match } from './Nav'
  import Button from './Button.svelte'
  import type { Props } from './Bar'

  const { sections }: Props = $props()

  const section = $derived(sections.find((s) => match(s, page.url.pathname)))

  const faded = derived(
    actions,
    ($actions, set) => {
      const a = $actions.at(-1) ?? null

      if (!a?.active) {
        set(false)

        return
      }

      const unsub = a.active.subscribe(set)

      return unsub
    },
    false,
  )

  const ret = $derived($returns.at(-1) ?? null)
  const rounded = 'rounded-xl'
</script>

<ul
  class={[$faded ? 'bg-background' : 'bg-muted', 'overflow-hidden flex sm:ms-4 h-full', rounded]}
  style="view-transition-name: shell-nav; view-transition-class: transition-morph;">
  {#if ret}
    <li>
      <Button
        id={section ? `nav-${section.id}-button` : undefined}
        active
        faded={$faded}
        onclick={() => back(ret.href)}
        class={ret.class}>
        {#if ret.children}
          {@render ret.children()}
        {:else}
          <ChevronLeft />
        {/if}
      </Button>
    </li>
  {:else}
    <Sections {sections} faded={$faded} />
  {/if}
</ul>

<style>
  ::view-transition-old(shell-nav),
  ::view-transition-new(shell-nav) {
    isolation: isolate;
  }

  ::view-transition-group(shell-nav) {
    z-index: 1;
  }
</style>
