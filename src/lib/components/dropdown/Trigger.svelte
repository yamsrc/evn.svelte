<script lang="ts">
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Trigger'

  const { children, id, class: classes, ...rest }: Props = $props()
  const ctx = getContext()

  function trackRef(node: HTMLDivElement) {
    ctx.setTriggerRef(node)

    return { destroy: () => ctx.setTriggerRef(undefined) }
  }
</script>

<div class="flex-1 h-full aspect-square" style="anchor-name: --{ctx.id};" use:trackRef>
  {#if !ctx.opened}
    <Button
      {id}
      class={classes}
      style="view-transition-name: {ctx.id}; view-transition-class: ease-overshoot;"
      onclick={() => ctx.open()}
      {...rest}>
      {@render children?.()}
    </Button>
  {/if}
</div>
