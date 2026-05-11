<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { setContext, type Context } from './Context'
  import type { Props } from './Root'

  const { picked, onpick, align = 'start', children, class: classes, ...rest }: Props = $props()

  // svelte-ignore state_referenced_locally
  const ui: Context['state'] = $state({
    chosen: picked,
    snap: 'start',
  })

  $effect(() => {
    ui.chosen = picked
    ui.snap = align
  })

  setContext({
    state: ui,
    pick: (index) => onpick?.(index),
  })
</script>

<Scrollable scroll={ui.chosen} {align} class={classes} {...rest}>
  {@render children()}
</Scrollable>
