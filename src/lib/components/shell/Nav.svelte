<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { preloadCode } from '$app/navigation'
  import { page } from '$app/state'
  import { back } from '$com/history'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import * as ButtonGroup from '$ui/button-group'
  import { exact, href, match, nested, type Props, type Section } from './Nav'
  import { actions, returns } from './store'

  const { sections, position = 'start', class: classes }: Props = $props()
  const action = $derived($actions.at(-1) ?? null)

  const active = $derived(sections.find(({ href }) => match(href, page.url.pathname)))
  const collapsed = $derived(active ? nested(active.href, page.url.pathname) : false)

  const visible = $derived(
    sections.filter((section) => !collapsed || match(section.href, page.url.pathname)),
  )

  const rounded = 'rounded-xl'
  const buttonMargin = 'm-1'

  onMount(() => {
    for (const section of sections) preloadCode(section.href)
  })

  function link(section: Section) {
    return collapsed ? null : exact(section.href, page.url.pathname) ? null : href(section.href)
  }
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class="
  fixed max-w-3xl mx-auto
  bottom-[env(safe-area-inset-bottom)] standalone:bottom-[max(env(safe-area-inset-bottom),1rem)]
  left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)]
  pointer-events-none
  {classes}
  ">
  <div
    class={cn(
      'flex items-center gap-2 h-21 p-5 pt-0 sm:pb-6 standalone:px-6 standalone:pb-0',
      position === 'center' ? 'justify-center' : 'justify-between',
      position === 'start' ? 'flex-row' : 'flex-row-reverse',
    )}>
    <ul
      class={cn(
        'bg-muted backdrop-blur-xs overflow-hidden flex pointer-events-auto sm:ml-4 h-full',
        rounded,
      )}
      style="view-transition-name: shell-nav;">
      {#each sections as section, i (section.href)}
        {@const active = match(section.href, page.url.pathname)}
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
                'absolute inset-0 bg-background z-0 rounded-[calc(var(--radius)+2px)]',
                buttonMargin,
                active || 'hidden',
              )}
              style={active ? 'view-transition-name: shell-nav-active;' : ''}>
            </div>
            <div
              class={cn(
                "flex flex-col items-center gap-0.5 z-10 relative font-bold [&_svg:not([class*='size-'])]:size-5",
              )}
              style="view-transition-name: shell-nav-item-{i};">
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
          'flex h-full',
          'pointer-events-auto',
          'sm:mr-4 transition-all duration-300',
          "[&_svg:not([class*='size-'])]:size-5",
          rounded,
          action || 'opacity-0',
          position === 'center' && !action && 'hidden',
        )}
        style="view-transition-name: shell-actions-{position};">
        <ButtonGroup.Root class={cn('flex-1 flex', buttonMargin, 'mr-0', action?.class)}>
          {@render action.snippet()}
        </ButtonGroup.Root>
      </div>
    {/if}
  </div>
</nav>

<style>
  ::view-transition-old(shell-nav),
  ::view-transition-new(shell-nav) {
    width: auto;
    isolation: isolate;
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
