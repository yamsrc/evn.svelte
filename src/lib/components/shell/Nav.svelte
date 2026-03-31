<script lang="ts">
  import { derived } from 'svelte/store'
  import { onMount } from 'svelte'
  import { ChevronLeft } from '@lucide/svelte'
  import * as ButtonGroup from '$ui/button-group'
  import { Button } from '$ui/button'
  import { cn } from '$lib/utils'
  import { ios, safari, shell, standalone } from '$lib/tools'
  import { back } from '$com/history'
  import { page } from '$app/state'
  import { preloadCode } from '$app/navigation'
  import { actions, returns } from './store'
  import { exact, match, nested, type Props, type Section } from './Nav'
  import Attention from './Attention.svelte'

  const app = standalone || shell
  const safariBrowser = ios && safari && !app

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

  const { sections, position = 'start', underlay = false, class: classes }: Props = $props()
  const action = $derived($actions.at(-1) ?? null)

  const active = $derived(sections.find((section) => match(section, page.url.pathname)))
  const collapsed = $derived(active ? nested(active, page.url.pathname) : false)

  const visible = $derived(
    sections.filter((section) => !collapsed || match(section, page.url.pathname)),
  )

  const rounded = 'rounded-xl'

  onMount(() => {
    for (const section of sections) {
      preloadCode(section.href)
      section.nested?.forEach((nested) => preloadCode(nested))
    }
  })

  function link(section: Section) {
    if (collapsed)
      return null // use `back()` to enable view transition
    else return exact(section, page.url.pathname) ? null : section.href
  }
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class={[
    'fixed max-w-3xl mx-auto',
    'bottom-[env(safe-area-inset-bottom)] standalone:bottom-[max(env(safe-area-inset-bottom),1rem)]',
    'left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)]',
    classes,
  ]}>
  {#if underlay}
    <div
      class={[
        'absolute -z-1 inset-0 -top-6',
        '-bottom-[max(env(safe-area-inset-bottom),1rem)]',
        'bg-background/80',
        'mask-[linear-gradient(to_bottom,transparent_0%,black_2rem)]',
      ]}
      style="view-transition-name: shell-nav-underlay;"
      class:hidden={safariBrowser}>
    </div>
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
    <ul
      class={cn('bg-muted overflow-hidden flex sm:ml-4 h-full', $faded && 'bg-background', rounded)}
      style="view-transition-name: shell-nav; view-transition-class: transition-morph;">
      {#each sections as section (section.href)}
        {@const active = match(section, page.url.pathname)}
        {@const hidden = !visible.includes(section)}
        {@const ret = $returns.at(-1)}
        <li>
          <Button
            id={`nav-${section.id}-button`}
            href={link(section)}
            onclick={collapsed ? () => back(ret?.href ?? section.href) : null}
            variant="ghost"
            class={cn(
              'relative flex flex-col h-full flex-1 min-w-16 p-3 gap-1 text-sm transition-colors duration-300 hover:bg-accent/25 overflow-hidden',
              rounded,
              active && 'text-accent-foreground',
              hidden && 'hidden',
              ret && ret.class,
            )}>
            <div
              class={cn(
                'absolute inset-0 bg-background z-0 rounded-[calc(var(--radius)+2px)] m-1',
                // $faded && 'opacity-25 transition-opacity duration-200',
                active || 'hidden',
              )}
              style={active
                ? 'view-transition-name: shell-nav-active; view-transition-class: transition-morph;'
                : ''}>
            </div>
            {#if section.unseen && !ret}
              <Attention
                id={`shell-nav-notify-${section.id}`}
                class={['absolute top-2.5 right-2.5 z-10', $faded && 'opacity-25']} />
            {/if}
            <div
              class={cn(
                "flex flex-col items-center gap-0.5 z-10 relative font-bold [&_svg:not([class*='size-'])]:size-5",
                'transition-opacity duration-200',
                $faded && 'opacity-25',
              )}
              style="view-transition-name: shell-nav-item-{section.id}; view-transition-class: shell-nav-item transition-morph;">
              {#if ret}
                {#if ret.children}
                  {@render ret.children()}
                {:else}
                  <ChevronLeft />
                {/if}
              {:else}
                <section.Icon color="var(--muted-foreground)" />
                <span>{section.label}</span>
              {/if}
            </div>
          </Button>
        </li>
      {/each}
    </ul>
    {#if action}
      <div
        class={cn(
          'flex h-full py-1',
          'sm:mr-4 transition-all duration-300',
          "[&_svg:not([class*='size-'])]:size-5",
          rounded,
          action || 'opacity-0',
          position === 'center' && !action && 'hidden',
        )}
        style="view-transition-name: shell-actions-{position};">
        <ButtonGroup.Root class={cn('flex h-full', action?.class)}>
          {@render action.snippet()}
        </ButtonGroup.Root>
      </div>
    {/if}
  </div>
</nav>

<style>
  ::view-transition-old(shell-nav),
  ::view-transition-new(shell-nav) {
    isolation: isolate;
  }

  ::view-transition-group(shell-nav),
  ::view-transition-group(shell-nav-underlay),
  ::view-transition-group(shell-nav-active),
  ::view-transition-group(*.shell-nav-item),
  ::view-transition-group(.attention) {
    z-index: 1;
  }

  ::view-transition-new(shell-nav-active):only-child {
    opacity: 0;
  }

  ::view-transition-old(shell-actions-start),
  ::view-transition-new(shell-actions-start),
  ::view-transition-old(shell-actions-end),
  ::view-transition-new(shell-actions-end) {
    width: auto;
    isolation: isolate;
  }

  @keyframes slide-out-right {
    to {
      transform: translateX(150%);
    }
  }

  @keyframes slide-in-left {
    from {
      transform: translateX(150%);
    }
  }

  @keyframes slide-out-left {
    to {
      transform: translateX(-150%);
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(-150%);
    }
  }

  ::view-transition-old(shell-actions-start):only-child {
    animation: slide-out-right 0.3s ease-out both;
  }

  ::view-transition-new(shell-actions-start):only-child {
    animation: slide-in-left 0.3s ease-out both;
  }

  ::view-transition-old(shell-actions-end):only-child {
    animation: slide-out-left 0.3s ease-out both;
  }

  ::view-transition-new(shell-actions-end):only-child {
    animation: slide-in-right 0.3s ease-out both;
  }
</style>
