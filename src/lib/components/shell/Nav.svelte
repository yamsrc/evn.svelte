<script lang="ts">
  import { page } from '$app/state'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { actions } from './Actions'
  import { exact, href, match, type Props } from './Nav'

  const { sections }: Props = $props()
  const action = $derived($actions.length > 0 ? $actions[$actions.length - 1] : null)
</script>

<div class="h-20 sm:h-24"></div>
<nav
  class="
  fixed max-w-screen-md mx-auto
  bottom-[env(safe-area-inset-bottom)] standalone:bottom-[max(env(safe-area-inset-bottom),0.5rem)]
  left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)]
  pointer-events-none
  "
>
  <div
    class="flex justify-between items-center gap-2 pt-0 p-2 sm:pb-6 standalone:px-6 standalone:pb-0"
  >
    <ul
      class="rounded-xl bg-background/50 backdrop-blur-xs border flex pointer-events-auto sm:ml-4"
      style="view-transition-name: shell-nav;"
    >
      {#each sections as section, i (section.href)}
        {@const active = match(section.href, page.url.pathname)}
        <li>
          <Button
            href={exact(section.href, page.url.pathname) ? null : href(section.href)}
            variant="ghost"
            class={cn(
              'relative flex flex-col h-auto w-20 p-2 gap-1 text-xs transition-colors duration-300 hover:bg-accent/25 overflow-hidden',
              active && 'text-accent-foreground',
            )}
          >
            <div
              class={cn('absolute inset-0 rounded-lg bg-accent/50 z-0', active || 'hidden')}
              style={active ? 'view-transition-name: shell-nav-active;' : ''}
            ></div>
            <div
              class="flex flex-col items-center gap-1 z-10 relative"
              style={`view-transition-name: shell-nav-${i}`}
            >
              <section.Icon class="size-6" fill={active ? 'currentColor' : 'none'} />
              {@render section.label()}
            </div>
          </Button>
        </li>
      {/each}
    </ul>
    <div
      class={cn(
        'pointer-events-auto',
        'rounded-xl bg-background/50 backdrop-blur-xs border sm:mr-4 transition-all duration-300',
        action || 'opacity-0',
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
  }

  ::view-transition-group(shell-nav),
  ::view-transition-group(shell-nav-active),
  ::view-transition-group(shell-nav-0),
  ::view-transition-group(shell-nav-1),
  ::view-transition-group(shell-nav-2),
  ::view-transition-group(shell-nav-3) {
    z-index: 5;
  }

  ::view-transition-group(shell-actions) {
    z-index: 5;
  }

  ::view-transition-old(shell-actions),
  ::view-transition-new(shell-actions) {
    z-index: 5;
    isolation: isolate;
  }
</style>
