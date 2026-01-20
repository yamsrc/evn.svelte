<script lang="ts">
  import { onMount } from 'svelte'
  import { preloadCode } from '$app/navigation'
  import { page } from '$app/state'
  import { back } from '$com/history'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { actions } from './Actions'
  import { exact, href, match, nested, type Props, type Section } from './Nav'

  const { sections, position = 'start', class: classes }: Props = $props()
  const action = $derived($actions.at(-1) ?? null)

  const active = $derived(sections.find(({ href }) => match(href, page.url.pathname)))
  const isNested = $derived(active ? nested(active.href, page.url.pathname) : false)

  const visible = $derived(
    sections.filter((section) => !isNested || match(section.href, page.url.pathname)),
  )

  const rounded = 'rounded-xl'

  onMount(() => {
    for (const section of sections) preloadCode(section.href)
  })

  function link(section: Section) {
    return isNested ? null : exact(section.href, page.url.pathname) ? null : href(section.href)
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
      'flex items-center gap-2 p-5 pt-0 sm:pb-6 standalone:px-6 standalone:pb-0',
      position === 'center' ? 'justify-center' : 'justify-between',
      position === 'start' ? 'flex-row' : 'flex-row-reverse',
    )}>
    <ul
      class={cn(
        'bg-muted backdrop-blur-xs overflow-hidden flex pointer-events-auto sm:ml-4 h-16',
        rounded,
      )}
      style="view-transition-name: shell-nav;">
      {#each sections as section, i (section.href)}
        {@const active = match(section.href, page.url.pathname)}
        {@const hidden = !visible.includes(section)}
        <li>
          <Button
            id={`nav-${section.id}-button`}
            href={link(section)}
            onclick={isNested ? () => back(section.href) : null}
            variant="ghost"
            class={cn(
              'relative flex flex-col h-full flex-1 min-w-16 p-3 gap-1 text-sm transition-colors duration-300 hover:bg-accent/25 overflow-hidden',
              rounded,
              active && 'text-accent-foreground',
              hidden && 'hidden',
            )}>
            <div
              class={cn(
                'absolute inset-0 bg-background z-0 m-1 rounded-[calc(var(--radius)+2px)]',
                active || 'hidden',
              )}
              style={active ? 'view-transition-name: shell-nav-active;' : ''}>
            </div>
            <div
              class="flex flex-col items-center gap-0.5 z-10 relative font-bold"
              style={`view-transition-name: shell-nav-${i}`}>
              <section.Icon class="size-5" color="var(--muted-foreground)" />
              {section.label}
            </div>
          </Button>
        </li>
      {/each}
    </ul>
    {#if action}
      <div
        class={cn(
          'pointer-events-auto',
          'sm:mr-4 transition-all duration-300',
          rounded,
          action || 'opacity-0',
          position === 'center' && !action && 'hidden',
        )}
        style="view-transition-name: shell-actions-{position};">
        <div class={cn('flex items-center min-h-10', action?.class)}>
          {@render action.snippet()}
        </div>
      </div>
    {/if}
  </div>
</nav>

<style>
  ::view-transition-old(shell-nav),
  ::view-transition-new(shell-nav) {
    width: auto;
  }

  ::view-transition-old(shell-actions-start),
  ::view-transition-new(shell-actions-start),
  ::view-transition-old(shell-actions-end),
  ::view-transition-new(shell-actions-end) {
    width: auto;
    z-index: 5;
    isolation: isolate;
  }

  ::view-transition-group(shell-nav),
  ::view-transition-group(shell-nav-active),
  ::view-transition-group([name^='shell-nav-']) {
    z-index: 5;
  }

  ::view-transition-group(shell-actions-start),
  ::view-transition-group(shell-actions-end) {
    z-index: 5;
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
