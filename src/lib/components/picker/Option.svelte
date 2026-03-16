<script lang="ts">
  import { getContext } from './Context'
  import type { Props } from './Option'

  const SNAP = {
    start: 'snap-start',
    center: 'snap-center',
    end: 'snap-end',
  } as const

  const ctx = getContext()
  const { index, onclick, class: classes, children, ...rest }: Props = $props()

  const picked = $derived(index !== undefined && index === ctx.state.chosen)
</script>

<div class={['rounded-lg', picked && 'ring-2 ring-muted-foreground transition-all']}>
  <button
    type="button"
    {...rest}
    data-picked={picked ? '' : undefined}
    class={['h-full', SNAP[ctx.state.snap], classes]}
    onclick={(event) => {
      if (index !== undefined) ctx.pick(index)

      onclick?.(event)
    }}>
    {#if children}
      {@render children()}
    {/if}
  </button>
</div>
