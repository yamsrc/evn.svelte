<script lang="ts">
  import { ChevronsDownUp, Hand } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import * as Stack from '$lib/components/stack'
  import { dict } from './intl'
  import type { Props } from './SplitterStack'

  const { units, child }: Props = $props()

  let collapsed = $state(true)
  let stack = $state<ReturnType<typeof Stack.Root> | undefined>()
</script>

<Stack.Root bind:this={stack} min={1} bind:collapsed>
  <Stack.Toolbar class="flex justify-between text-muted-foreground">
    <Button variant="ghost" size="sm">
      <Hand />
      {$dict.splitter.stack.claim}
    </Button>
    <Button variant="ghost" size="sm" onclick={() => stack?.collapse()}>
      <ChevronsDownUp />
    </Button>
  </Stack.Toolbar>
  {#each units as unit, i (i)}
    <Stack.Item id={i.toString()}>
      {@render child(unit, collapsed)}
    </Stack.Item>
  {/each}
</Stack.Root>
