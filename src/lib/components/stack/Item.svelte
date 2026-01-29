<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { STACK_CTX, type StackContext } from './Root'
  import type { Props } from './Item'

  const { children, id }: Props = $props()
  const { increment, decrement } = getContext<StackContext>(STACK_CTX)

  onMount(() => {
    increment()

    return decrement
  })
</script>

<div style:view-transition-name="stack-{id}" style:view-transition-class="stack-item">
  {@render children()}
</div>
