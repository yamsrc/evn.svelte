<script lang="ts">
  import { ok } from 'svas'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Panel } from '$lib/components/panel'
  import { dict } from '$lib/intl'
  import * as Item from '$ui/item'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import { getContext } from './Context'
  import type { Props } from './Payer'

  const { contact, participant = $bindable(), ontoggle }: Props = $props()
  const account = $derived(contact?.account ?? $me)
  const selected = $derived(participant.paid !== undefined)

  function onclick(e: MouseEvent) {
    e.preventDefault()

    if (participant.paid === undefined) participant.paid = 0
    else delete participant.paid

    if (ok(account)) ontoggle?.(account.id, selected)
    else console.error('Contact has no account', contact)
  }

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0'

  const ctx = getContext()
  const split = $derived(ctx.split)
</script>

{#if ok(account)}
  <Item.Root variant="outline" class="flex flex-nowrap items-stretch gap-1.5 p-0 border-none">
    <div class="flex-1 min-w-0">
      <Panel
        href={`/contacts/${account.id}/`}
        variant="outline"
        h="min-h-14 h-fit"
        {selected}
        {onclick}
      >
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
      <Amount class="flex-1 max-w-32 shrink min-h-14 h-full" bind:value={participant.paid} />
    {/if}
  </Item.Root>
{/if}
