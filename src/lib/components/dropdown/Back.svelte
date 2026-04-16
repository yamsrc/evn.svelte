<script lang="ts">
  import { ArrowLeft } from '@lucide/svelte'
  import Item from './Item.svelte'
  import { getContext } from './Context'
  import type { Props } from './Back'

  const { children, class: classes, ...rest }: Props = $props()
  const ctx = getContext()
</script>

<Item onclick={() => ctx.pop()} class={classes} {...rest}>
  <ArrowLeft />
  {#if children}{@render children()}{/if}
</Item>
