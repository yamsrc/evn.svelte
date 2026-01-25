<script lang="ts">
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Panel } from '$lib/components/panel'
  import { dict } from '$lib/intl'
  import * as Item from '$ui/item'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import { CoinsInput } from '@/app/ui'
  import { account as me } from '@/iam'
  import { getContext } from './Context'
  import type { Props } from './Payer'

  const { contact, account, participant = $bindable() }: Props = $props()
  const selected = $derived(participant.paid !== undefined)

  function onclick(e: MouseEvent) {
    e.preventDefault()

    if (participant.paid === undefined) participant.paid = 0
    else delete participant.paid
  }

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0'

  const ctx = getContext()
  const split = $derived(ctx.split)
</script>

<Item.Root
  variant="outline"
  class="expenses-payer flex flex-nowrap items-stretch gap-1.5 p-0 border-none">
  <div class="flex-1 min-w-0">
    <Panel variant="outline" h="min-h-14 h-fit" {selected} {onclick}>
      {#snippet left()}
        {#if $me?.id === account.id}
          <div class="flex items-center justify-between gap-2 w-full">
            <Item.Title class={nameClass}>
              <TextEllipsis>{$dict.expenses.me}</TextEllipsis>
            </Item.Title>
          </div>
        {:else}
          <div class="flex items-center gap-2 w-full">
            <Item.Media variant="image" class="size-8">
              <Picture {account} size={32} />
            </Item.Media>
            <Item.Title class={nameClass}>
              <TextEllipsis>{account.name}</TextEllipsis>
            </Item.Title>
          </div>
        {/if}
      {/snippet}
      {#snippet right()}
        {#if contact && !(selected && split)}
          <Item.Content>
            <Balance balance={contact.balance ?? 0} />
          </Item.Content>
        {/if}
        {#if $me?.id === account.id}
          <Item.Media variant="image" class="size-8">
            <Picture {account} size={32} />
          </Item.Media>
        {/if}
      {/snippet}
    </Panel>
  </div>
  {#if selected && split}
    <CoinsInput class="flex-1 max-w-32 shrink min-h-14 h-full" bind:value={participant.paid} />
  {/if}
</Item.Root>
