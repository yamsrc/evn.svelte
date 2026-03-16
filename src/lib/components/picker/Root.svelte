<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { setContext, type Context } from './Context'
  import type { Props } from './Root'

  const { picked, onpick, align = 'start', children, class: classes, ...rest }: Props = $props()

  const ui: Context['state'] = $state({
    chosen: undefined,
    snap: 'start',
  })

  $effect(() => {
    ui.chosen = picked
    ui.snap = align
  })

  setContext({
    state: ui,
    pick: (index) => onpick(index),
  })
</script>

<Scrollable scroll={ui.chosen} {align} class={classes} {...rest}>
  {@render children()}
</Scrollable>
