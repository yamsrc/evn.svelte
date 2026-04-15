<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Content'

  const { children, position = 'start-top', class: classes }: Props = $props()
  const ctx = getContext()

  function portal(node: HTMLElement) {
    document.body.appendChild(node)

    return { destroy: () => node.remove() }
  }

  function trackRef(node: HTMLDivElement) {
    ctx.setContentRef(node)

    return { destroy: () => ctx.setContentRef(undefined) }
  }
</script>

{#if ctx.opened}
  <div
    use:portal
    use:trackRef
    style="position-anchor: --{ctx.id}; view-transition-name: {ctx.id}; view-transition-class: transition-spring transition-morph dropdown-content;"
    class={[
      'fixed z-49 flex flex-col',
      'bg-popover shadow-[0_0_15px_var(--shadow-color)] text-popover-foreground rounded-xl',
      'p-1',
      position === 'start-top' && 'action-menu-start-top',
      position === 'start-bottom' && 'action-menu-start-bottom',
      position === 'end-top' && 'action-menu-end-top',
      position === 'end-bottom' && 'action-menu-end-bottom',
      classes,
    ]}>
    {@render children()}
  </div>
{/if}

<style>
  .action-menu-start-top {
    position-area: span-x-start span-top;
    position-try-fallbacks: span-x-end span-top;
  }

  .action-menu-start-bottom {
    position-area: span-x-start span-bottom;
    position-try-fallbacks: span-x-end span-top;
  }

  .action-menu-end-top {
    position-area: span-x-end span-top;
    position-try-fallbacks: span-x-start span-bottom;
  }

  .action-menu-end-bottom {
    position-area: span-x-end span-bottom;
    position-try-fallbacks: span-x-start span-top;
  }

  ::view-transition-group(.dropdown-content) {
    z-index: 1;
  }
</style>
