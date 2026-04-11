<script lang="ts">
  import { onMount } from 'svelte'
  import { getContext } from './Context'
  import type { Props } from './Item'

  const { children, id, class: classes }: Props = $props()
  const ctx = getContext()

  onMount(() => {
    ctx.increment()

    return ctx.decrement
  })
</script>

<div
  style:view-transition-name="stack-{ctx.id}-{id}"
  style:view-transition-class="transition-spring"
  class={classes}>
  {@render children()}
</div>
