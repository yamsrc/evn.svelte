<script lang="ts" module>
  const iconProps = {
    size: 16,
    class: 'text-muted-foreground',
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { ChevronsUpDown, CircleCheckBig, CircleDashed } from '@lucide/svelte'
  import { Coins } from '@/app/ui'
  import { Asyvatar } from '@/accounts/ui'
  import * as Item from '$ui/item'
  import { store } from './store'
  import { group, type Unit } from './groups'
  import { toggle, unitIdentities, itemIdentities, toggleAll, groupClaimedBy } from './claims'
  import Stack from './Stack.svelte'
  import { sign, type Props } from './Items'

  const { receipt, actor }: Props = $props()
  const groups = $derived(group(receipt.items))

  let mounted = $state(false)

  onMount(() => (mounted = true))
</script>

{#snippet card(unit: Unit, index = 0, quantity?: number)}
  <Item.Root class="w-full">
    {#snippet child({ props: { class: classes, ...rest } })}
      {@const faces =
        quantity === undefined
          ? unitIdentities($store, unit.item, index)
          : itemIdentities($store, unit)}
      <button
        {...rest}
        class={['text-start not-disabled:hover:bg-accent', classes]}
        onclick={() => toggle(actor, unit.item, index)}
        disabled={receipt.done[actor] === true}>
        <Item.Media class="w-5">
          {#if quantity}
            <ChevronsUpDown {...iconProps} />
          {:else if faces.length > 0}
            <CircleCheckBig {...iconProps} />
          {:else}
            <CircleDashed {...iconProps} />
          {/if}
        </Item.Media>
        <Item.Content class="flex flex-row flex-wrap items-centerd gap-2">
          <Item.Title class="text-pretty">{unit.display}</Item.Title>
          {#if faces.length > 0}
            <div class="flex flex-row flex-nowrap items-center [&>*:not(:last-child)]:-mr-[8px]">
              {#each faces as identity (identity)}
                <Asyvatar
                  {identity}
                  size={24}
                  class={[
                    'ring-1 ring-accent-foreground/50',
                    mounted && 'starting:scale-0 duration-150',
                  ]} />
              {/each}
            </div>
          {/if}
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

<div class={['flex flex-col gap-2', mounted && 'starting:opacity-0 duration-300']}>
  {#each groups as group, i (group.id)}
    {#if group.outcast}
      {@const claimed = groupClaimedBy($store, actor, group.id)}
      <Stack {group} {claimed} ontoggle={() => toggleAll(actor, group.id, !claimed)}>
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
