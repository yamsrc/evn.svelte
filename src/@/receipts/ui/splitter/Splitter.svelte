<script lang="ts" module>
  const iconProps = {
    size: 16,
    class: 'text-muted-foreground',
  }
</script>

<script lang="ts">
  import { Check, ChevronsUpDown, CircleDashed, UserPlus } from '@lucide/svelte'
  import { Coins } from '@/app/ui'
  import { Action } from '@/app/ui'
  import { Asyvatar } from '@/accounts/ui'
  import * as Item from '$ui/item'
  import { Actions } from '$com/shell'
  import { group, type Unit } from './groups'
  import { store, sync, toggle, identities, toggleAll, groupClaimedBy } from './claims'
  import Stack from './Stack.svelte'
  import { sign, type Props } from './Splitter'

  const { receipt, actor }: Props = $props()
  const groups = $derived(group(receipt.items))

  $effect(() => sync(receipt))
</script>

{#snippet card(unit: Unit, index = 0, quantity?: number)}
  <Item.Root class="w-full">
    {#snippet child({ props: { class: classes, ...rest } })}
      {@const faces = identities($store, actor.id, unit.item, index)}
      <button
        {...rest}
        class={['text-start', classes]}
        onclick={() => toggle(actor.id, unit.item, index)}>
        <Item.Media class="w-5">
          {#if quantity}
            <ChevronsUpDown {...iconProps} />
          {:else if faces.hero}
            <Asyvatar identity={faces.hero} size={24} />
          {:else}
            <CircleDashed {...iconProps} />
          {/if}
        </Item.Media>
        <Item.Content>
          <Item.Title>{unit.display}</Item.Title>
        </Item.Content>
        <Item.Actions>
          <Coins
            amount={unit.price}
            prefix={quantity ? `${quantity} ×` : undefined}
            sign={sign($store, unit, quantity === undefined ? index : undefined)} />
        </Item.Actions>
      </button>
    {/snippet}
  </Item.Root>
{/snippet}

<div class="flex flex-col gap-2">
  {#each groups as group, i (group.id)}
    {#if group.outcast}
      {@const claimed = groupClaimedBy($store, actor.id, group.id)}
      <Stack {group} {claimed} ontoggle={() => toggleAll(actor.id, group.id, !claimed)}>
        {#snippet child(unit, index, collapsed)}
          {@render card(unit, index, collapsed ? group.units.length : undefined)}
        {/snippet}
      </Stack>
    {:else}
      <div
        class="flex flex-col gap-2"
        style:view-transition-name={i === 0 ? undefined : `splitter-group-${group.id}`}
        style:view-transition-class="transition-spring">
        {#each group.units as unit (unit.item)}
          {@render card(unit)}
        {/each}
      </div>
    {/if}
  {/each}
</div>

<Actions>
  <Action
    id="nav-action-receipt-share"
    variant={receipt.identities.length === 1 ? 'default' : 'secondary'}>
    <UserPlus />
  </Action>
  <Action
    id="nav-action-receipt-split"
    variant={receipt.identities.length === 1 ? 'secondary' : 'default'}>
    <Check />
  </Action>
</Actions>
