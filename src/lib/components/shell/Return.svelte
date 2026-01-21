<script lang="ts">
  import { onMount } from 'svelte'
  import { returns } from './store'
  import type { Props } from './Return'

  const { children, href = '..', class: classes }: Props = $props()

  onMount(() => {
    const id = Math.random().toString(36).substring(2, 15)

    function add() {
      returns.update((back) => {
        back.push({ id, href, children, class: classes })

        return back
      })
    }

    function remove() {
      returns.update((back) => {
        return back.filter((back) => back.id !== id)
      })
    }

    add()

    return () => remove()
  })
</script>
