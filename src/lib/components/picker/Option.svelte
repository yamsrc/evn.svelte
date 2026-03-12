<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Option'

  const SNAP = {
    start: 'snap-start',
    center: 'snap-center',
    end: 'snap-end',
  } as const

  const ctx = getContext()
  const { pickable = true, onclick, class: classes, children, ...rest }: Props = $props()

  const id = Symbol('picker.option')

  ctx.register({
    id,
    pickable: () => pickable,
  })

  onDestroy(() => {
    ctx.unregister(id)
  })

  const picked = $derived(pickable && ctx.state.chosen === id)
</script>

<div class={['rounded-lg', picked && 'outline-muted-foreground/50 outline-2']}>
  <Button
    {...rest}
    data-picked={picked ? '' : undefined}
    class={['h-full', SNAP[ctx.state.snap], picked && 'bg-accent dark:bg-accent', classes]}
    onclick={(event) => {
      if (pickable) ctx.pick(id)

      onclick?.(event as never)
    }}>
    {#if children}
      {@render children()}
    {/if}
  </Button>
</div>
