<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Content'

  const { children, class: classes }: Props = $props()
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
    style="position-anchor: --{ctx.id}; view-transition-name: {ctx.id}; view-transition-class: spring;"
    class={[
      'action-menu-content fixed z-1001 flex flex-col',
      'bg-popover shadow-[0_0_15px_var(--shadow-color)] text-popover-foreground rounded-xl',
      'p-2',
      classes,
    ]}>
    {@render children()}
  </div>
{/if}

<style>
  .action-menu-content {
    position-area: span-x-start span-top;
    position-try-fallbacks: span-x-end span-top;
  }
</style>
