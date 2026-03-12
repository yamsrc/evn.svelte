<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { setContext, type Entry } from './Context'
  import type { Props } from './Root'

  const {
    picked,
    scroll: target = picked,
    onpick,
    snap = 'start',
    children,
    class: classes,
  }: Props = $props()

  let entries: Entry[] = $state([])

  const ui: { chosen?: symbol; snap: 'start' | 'center' | 'end' } = $state({
    chosen: undefined,
    snap: 'start',
  })

  const picks = $derived(entries.filter((entry) => entry.pickable()))
  const chosen = $derived(picked >= 0 && picked < picks.length ? picks[picked].id : undefined)
  const scroll = $derived(
    target >= 0 && target < picks.length
      ? entries.findIndex((entry) => entry.id === picks[target].id)
      : -1,
  )

  $effect(() => {
    ui.chosen = chosen
    ui.snap = snap
  })

  setContext({
    state: ui,
    pick: (id) => {
      const index = picks.findIndex((entry) => entry.id === id)

      if (index >= 0) onpick(index)
    },
    register: (entry) => entries.push(entry),
    unregister: (id) => {
      entries = entries.filter((entry) => entry.id !== id)
    },
  })
</script>

<Scrollable {scroll} align={snap} class={classes}>
  {@render children()}
</Scrollable>
