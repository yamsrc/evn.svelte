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
  const { pickable = true, order, onclick, class: classes, children, ...rest }: Props = $props()

  const id = Symbol('picker.option')

  // svelte-ignore state_referenced_locally
  ctx.register({
    id,
    pickable: () => pickable,
    order: order === undefined ? undefined : () => order,
  })

  onDestroy(() => {
    ctx.unregister(id)
  })

  const picked = $derived(pickable && ctx.state.chosen === id)
</script>

<div class={['h-full transition-all rounded-lg', picked && 'outline-muted-foreground/50 outline-2']}>
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
