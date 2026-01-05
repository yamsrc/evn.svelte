<script lang="ts">
  import { cn } from '$lib/utils'
  import Button from '$ui/button/button.svelte'
  import * as Item from '$ui/item'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import type { Props } from './Payer'
  import type { Participant } from '@/expenses'

  let {
    account,
    contact,
    participant = $bindable<Participant>(),
    partial = false,
    selected = $bindable(),
    onselect,
    onchange,
  }: Props = $props()

  function onclick() {
    onselect?.(account.id, !selected)
  }

  function oninput(paid: number) {
    participant = { ...participant, paid }

    onchange?.(account.id, paid)
  }
</script>

<Item.Root variant="outline" class={cn('flex gap-2 min-h-14 p-0 border-none')}>
  <Button
    variant="outline"
    class={cn('size-full flex-1 justify-between', {
      'bg-accent dark:bg-accent outline-solid outline-2 outline-muted-foreground/50': selected,
    })}
    {onclick}
  >
    {#if $me?.id === account.id}
      <!-- TODO: Me -->
      <Item.Title>{account.name}</Item.Title>
      <Item.Media>
        <Picture {account} size={32} />
      </Item.Media>
    {:else}
      <Item.Media>
        <Picture {account} size={32} />
      </Item.Media>
      <Item.Title>{account.name}</Item.Title>
      {#if !(selected && partial)}
        <Item.Description>
          <Balance balance={contact?.balance ?? 0} />
        </Item.Description>
      {/if}
    {/if}
  </Button>
  {#if selected && partial}
    <Amount class="w-32" {oninput} value={participant.paid ?? 0} />
  {/if}
</Item.Root>
