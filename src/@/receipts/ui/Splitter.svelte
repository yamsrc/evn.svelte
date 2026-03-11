<script lang="ts">
  import { Check, CircleDashed } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import * as Item from '$ui/item'
  import { Coins } from '@/app/ui'
  import { Action } from '@/app/ui'
  import type { Props } from './Splitter'

  const { receipt }: Props = $props()
</script>

<div class="flex flex-col gap-2">
  {#each receipt.items as item (item.id)}
    <Item.Root>
      {#snippet child({ props })}
        <button {...props}>
          <Item.Media>
            <CircleDashed size={16} class="text-muted-foreground" />
          </Item.Media>
          <Item.Content>
            <Item.Title>{item.display}</Item.Title>
          </Item.Content>
          <Item.Actions>
            <Coins
              amount={item.price}
              prefix={item.quantity > 1 ? `${item.quantity} ×` : undefined} />
          </Item.Actions>
        </button>
      {/snippet}
    </Item.Root>
  {/each}
</div>

<Actions>
  <Action id="nav-action-receipt-split">
    <Check />
  </Action>
</Actions>
