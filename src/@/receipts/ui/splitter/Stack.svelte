<script lang="ts">
  import { ChevronsDownUp, Hand, X } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import * as Stack from '$lib/components/stack'
  import { dict } from '../intl'
  import type { Props } from './Stack'

  const { group, claimed, child, ontoggle }: Props = $props()

  let collapsed = $state(true)
  let stack = $state<ReturnType<typeof Stack.Root> | undefined>()
</script>

<Stack.Root bind:this={stack} min={1} bind:collapsed>
  <Stack.Toolbar class="flex justify-between text-muted-foreground">
    <Button variant="ghost" size="sm" onclick={ontoggle}>
      {#if claimed}
        <X />
        {$dict.splitter.stack.release}
      {:else}
        <Hand />
        {$dict.splitter.stack.claim}
      {/if}
    </Button>
    <Button variant="ghost" size="sm" onclick={() => stack?.collapse()}>
      <ChevronsDownUp />
    </Button>
  </Stack.Toolbar>
  {#each group.units as unit, i (i)}
    <Stack.Item id={i.toString()}>
      {@render child(unit, i, collapsed)}
    </Stack.Item>
  {/each}
</Stack.Root>
