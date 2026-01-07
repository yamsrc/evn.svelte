<script lang="ts">
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import * as Item from '$ui/item'
  import { Toggle } from '$ui/toggle'
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
    split = false,
    selected = $bindable(),
    onselect,
  }: Props = $props()

  function onPressedChange(selected: boolean) {
    onselect?.(account.id, selected ?? false)
  }

  function oninput(paid: number) {
    participant.paid = paid
  }

  const nameClass =
    'inline text-start flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap font-normal'
</script>

<Item.Root variant="outline" class="flex flex-nowrap items-stretch gap-2 p-0 border-none">
  <Toggle
    variant="outline"
    class={cn(
      'h-full min-h-14 flex-1 flex flex-row justify-between items-center flex-nowrap overflow-hidden',
      'data-[state=on]:bg-accent data-[state=on]:dark:bg-accent data-[state=on]:outline-solid data-[state=on]:outline-2 data-[state=on]:outline-muted-foreground/50',
    )}
    bind:pressed={selected}
    {onPressedChange}
  >
    {#if $me?.id === account.id}
      <div class="flex items-center gap-2 w-full">
        <Item.Title class={nameClass}>{$dict.expenses.me}</Item.Title>
        <Item.Media>
          <Picture {account} size={32} />
        </Item.Media>
      </div>
    {:else}
      <div class="flex items-center gap-2 w-full">
        <Item.Media>
          <Picture {account} size={32} />
        </Item.Media>
        <Item.Title class={nameClass}>{account.name}</Item.Title>
      </div>
      {#if !(selected && split)}
        <Item.Content>
          <Balance balance={contact?.balance ?? 0} />
        </Item.Content>
      {/if}
    {/if}
  </Toggle>
  {#if selected && split}
    <Amount
      class="flex-1 max-w-32 shrink min-h-14 h-full"
      {oninput}
      value={participant.paid ?? 0}
    />
  {/if}
</Item.Root>
