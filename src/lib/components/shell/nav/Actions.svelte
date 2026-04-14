<script lang="ts">
  import { onMount } from 'svelte'
  import { actions } from './store'
  import type { Props } from './Actions'

  const { children, class: classes, active }: Props = $props()

  onMount(() => {
    const id = Math.random().toString(36).substring(2, 15)

    function add() {
      actions.update((actions) => {
        actions.push({ id, snippet: children, class: classes, active })

        return actions
      })
    }

    function remove() {
      actions.update((actions) => {
        actions = actions.filter((action) => action.id !== id)

        return actions
      })
    }

    add()

    return () => remove()
  })
</script>
