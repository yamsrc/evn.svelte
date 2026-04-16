<script lang="ts">
  import { Button } from '$ui/button'
  import { buttonVariants } from '$ui/button'
  import { beforeNavigate } from '$app/navigation'
  import { getContext } from './Context'
  import type { Props } from './Trigger'

  const { children, id, class: classes, variant, size, ...rest }: Props = $props()
  const ctx = getContext()

  function trackRef(node: HTMLDivElement) {
    ctx.setTriggerRef(node)

    return { destroy: () => ctx.setTriggerRef(undefined) }
  }

  let style = $derived(
    `view-transition-name: ${ctx.id}; view-transition-class: transition-spring transition-morph dropdown-content;`,
  )

  beforeNavigate(() => (style = ''))
</script>

<div class="flex-1 h-full" style="anchor-name: --{ctx.id};" use:trackRef>
  {#if ctx.opened}
    <!-- Placeholder of same size and position for proper dropdown alignment when trigger is hidden -->
    <div class={[buttonVariants({ variant, size }), classes, 'invisible']}></div>
  {:else}
    <Button {id} {variant} {size} class={classes} {style} onclick={() => ctx.open()} {...rest}>
      {@render children?.()}
    </Button>
  {/if}
</div>
