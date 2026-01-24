<script lang="ts">
  import { CircleArrowLeft, CircleArrowRight } from '@lucide/svelte'
  import { Async } from 'svas'
  import { grammar } from '$lib/intl'
  import { locale } from '$lib/intl'
  import { accounts } from '@/accounts'
  import { Avatar } from '@/accounts/ui'
  import Coins from '@/app/ui/Coins.svelte'
  import { account } from '@/iam'
  import { dict } from '../intl'
  import type { Props } from './Props'

  const { expense }: Props = $props()

  const payer = $derived(
    Object.keys(expense.participants).find((id) => expense.participants[id].paid !== undefined),
  ) as string

  const received = $derived(payer !== $account?.id)

  const contactId = $derived(
    received
      ? payer
      : Object.keys(expense.participants).find((id) => expense.participants[id].amount !== 0),
  )

  const amount = $derived(expense.participants[payer].paid)

  const formatter = $derived(new Intl.DateTimeFormat($locale, { month: 'short', day: 'numeric' }))
  const date = $derived(formatter.format(new Date(expense.date)))
</script>

{#if contactId !== undefined}
  <div
    class="px-4 py-3 border border-constructive/30 bg-constructive/20 rounded-lg flex justify-between items-center">
    <div class="flex items-center gap-3">
      <Async store={accounts.get(contactId)}>
        {#snippet awaited(contact)}
          <Avatar account={contact} />
          <div class="flex flex-col">
            <span>{contact.name}</span>
            <span class="text-sm text-muted-foreground">
              {date}
            </span>
          </div>
        {/snippet}
      </Async>
    </div>
    <div class="flex items-center gap-2 [&_svg]:size-4">
      <span class="flex items-center gap-1 text-sm text-muted-foreground">
        {#if received}
          <CircleArrowRight color="black" fill="currentColor" class="text-constructive" />
          {$dict.transfers.done.received($grammar)}
        {:else}
          <CircleArrowLeft color="black" fill="currentColor" class="text-primary" />
          {$dict.transfers.done.paid($grammar)}
        {/if}
      </span>
      <Coins {amount} sign="neutral" />
    </div>
  </div>
{/if}
