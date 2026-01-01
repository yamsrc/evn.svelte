<script lang="ts">
  import { page } from '$app/state'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { actions } from './Actions'
  import { exact, href, match, type Props } from './Nav'

  const { sections, position = 'start', class: classes }: Props = $props()
  const action = $derived($actions.at(-1) ?? null)

  const rounded = 'rounded-xl'
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class="
  fixed max-w-3xl mx-auto
  bottom-[env(safe-area-inset-bottom)] standalone:bottom-[max(env(safe-area-inset-bottom),1rem)]
  left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)]
  pointer-events-none
  {classes}
  "
>
  <div
    class={cn(
      'flex items-center gap-2 p-5 pt-0 sm:pb-6 standalone:px-6 standalone:pb-0',
      position === 'center' ? 'justify-center' : 'justify-between',
      position === 'start' ? 'flex-row' : 'flex-row-reverse',
    )}
  >
    <ul
      class={cn(
        'bg-muted backdrop-blur-xs border overflow-hidden flex pointer-events-auto sm:ml-4 h-17',
        rounded,
      )}
      style="view-transition-name: shell-nav;"
    >
      {#each sections as section, i (section.href)}
        {@const active = match(section.href, page.url.pathname)}
        <li>
          <Button
            href={exact(section.href, page.url.pathname) ? null : href(section.href)}
            variant="ghost"
            class={cn(
              'relative flex flex-col h-full flex-1 min-w-16 p-2 gap-1 text-sm transition-colors duration-300 hover:bg-accent/25 overflow-hidden',
              rounded,
              active && 'text-accent-foreground',
            )}
            id={`nav-${section.id}`}
          >
            <div
              class={cn(
                'absolute inset-0 bg-background z-0 m-1 rounded-[calc(var(--radius)+2px)]',
                active || 'hidden',
              )}
              style={active ? 'view-transition-name: shell-nav-active;' : ''}
            ></div>
            <div
              class="flex flex-col items-center gap-0.5 z-10 relative font-bold"
              style={`view-transition-name: shell-nav-${i}`}
            >
              <section.Icon class="size-5" color="var(--muted-foreground)" />
              {section.label}
            </div>
          </Button>
        </li>
      {/each}
    </ul>
    <div
      class={cn(
        'pointer-events-auto',
        'bg-background/50 backdrop-blur-xs border sm:mr-4 transition-all duration-300',
        rounded,
        action || 'opacity-0',
        position === 'center' && !action && 'hidden',
      )}
      style="view-transition-name: shell-actions;"
    >
      <div class={cn('flex items-center min-h-10', action?.class)}>
        {#if action}
          {@render action.snippet()}
        {/if}
      </div>
    </div>
  </div>
</nav>

<style>
  ::view-transition-old(shell-actions),
  ::view-transition-new(shell-actions) {
    width: auto;
    z-index: 5;
    isolation: isolate;
  }

  ::view-transition-group(shell-nav),
  ::view-transition-group(shell-nav-active),
  ::view-transition-group([name^='shell-nav-']) {
    z-index: 5;
  }

  ::view-transition-group(shell-actions) {
    z-index: 5;
  }
</style>
