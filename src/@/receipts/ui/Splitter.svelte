<script lang="ts" module>
  const iconProps = {
    size: 16,
    class: 'text-muted-foreground',
  }
</script>

<script lang="ts">
  import { Check, ChevronsUpDown, CircleDashed, Share2 } from '@lucide/svelte'
  import { Coins } from '@/app/ui'
  import { Action } from '@/app/ui'
  import * as Item from '$ui/item'
  import { Actions } from '$com/shell'
  import Stack from './SplitterStack.svelte'

  import { group, type Props, type Unit } from './Splitter'

  const { receipt }: Props = $props()
  const groups = $derived(group(receipt.items))
</script>

{#snippet content(unit: Unit, quantity?: number)}
  <Item.Root>
    <Item.Media>
      {#if quantity}
        <ChevronsUpDown {...iconProps} />
      {:else}
        <CircleDashed {...iconProps} />
      {/if}
    </Item.Media>
    <Item.Content>
      <Item.Title>{unit.display}</Item.Title>
    </Item.Content>
    <Item.Actions>
      <Coins amount={unit.price} prefix={quantity ? `${quantity} ×` : undefined} />
    </Item.Actions>
  </Item.Root>
{/snippet}

<div class="flex flex-col gap-2">
  {#each groups as group, i (group.id)}
    {#if group.outcast}
      <Stack units={group.units}>
        {#snippet child(unit, collapsed)}
          {@render content(unit, collapsed ? group.units.length : undefined)}
        {/snippet}
      </Stack>
    {:else}
      <div
        class="flex flex-col gap-2"
        style:view-transition-name={i === 0 ? undefined : `splitter-group-${group.id}`}
        style:view-transition-class="transition-spring">
        {#each group.units as unit, i (i)}
          {@render content(unit)}
        {/each}
      </div>
    {/if}
  {/each}
</div>

<Actions>
  <Action id="nav-action-receipt-share" variant="secondary">
    <Share2 />
  </Action>
  <Action id="nav-action-receipt-split">
    <Check />
  </Action>
</Actions>
