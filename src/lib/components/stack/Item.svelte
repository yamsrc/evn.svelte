<script lang="ts">
  import { onMount } from 'svelte'
  import { getContext } from './Context'
  import type { Props } from './Item'

  const { children, id }: Props = $props()
  const ctx = getContext()

  onMount(() => {
    ctx.increment()

    return ctx.decrement
  })
</script>

<div style:view-transition-name="stack-{id}" style:view-transition-class="ease-overshoot">
  {@render children()}
</div>
