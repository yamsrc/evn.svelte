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
    split = false,
    selected = $bindable(),
    onselect,
  }: Props = $props()

  function onclick() {
    onselect?.(account.id, !selected)
  }

  function oninput(paid: number) {
    participant.paid = paid
  }

  const titleClass =
    'inline text-start flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap font-normal'
</script>

<Item.Root variant="outline" class="flex flex-nowrap gap-2 min-h-14 p-0 border-none">
  <Button
    variant="outline"
    class={cn(
      'size-full flex-1 flex flex-row justify-between items-center flex-nowrap overflow-hidden',
      {
        'bg-accent dark:bg-accent outline-solid outline-2 outline-muted-foreground/50': selected,
      },
    )}
    {onclick}
  >
    {#if $me?.id === account.id}
      <div class="flex items-center gap-2 w-full">
        <!-- TODO: Me -->
        <Item.Title class={titleClass}>{account.name}</Item.Title>
        <Item.Media>
          <Picture {account} size={32} />
        </Item.Media>
      </div>
    {:else}
      <div class="flex items-center gap-2 w-full">
        <Item.Media>
          <Picture {account} size={32} />
        </Item.Media>
        <Item.Title class={titleClass}>{account.name}</Item.Title>
      </div>
      {#if !(selected && split)}
        <Item.Content>
          <Item.Description>
            <Balance balance={contact?.balance ?? 0} />
          </Item.Description>
        </Item.Content>
      {/if}
    {/if}
  </Button>
  {#if selected && split}
    <Amount class="flex-1 max-w-32 shrink" {oninput} value={participant.paid ?? 0} />
  {/if}
</Item.Root>
