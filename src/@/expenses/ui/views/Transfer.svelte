<script lang="ts">
  import { CircleArrowLeft, CircleArrowRight } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { Panel } from '$com/panel'
  import { grammar } from '$lib/intl'
  import { locale } from '$lib/intl'
  import { accounts } from '@/accounts'
  import { Avatar } from '@/accounts/ui'
  import Coins from '@/app/ui/Coins.svelte'
  import { contacts } from '@/contacts'
  import { account } from '@/iam'
  import { dict } from '../intl'
  import type { Props } from './Props'

  const { expense, highlighted }: Props = $props()

  const payer = $derived(
    Object.keys(expense.participants).find((id) => expense.participants[id].paid !== undefined),
  )

  const received = $derived(payer !== $account?.id)

  const identity = $derived(
    received
      ? payer
      : Object.keys(expense.participants).find((id) => expense.participants[id].amount !== 0),
  )

  const amount = $derived(expense.participants[payer!]?.paid)

  const formatter = $derived(new Intl.DateTimeFormat($locale, { month: 'short', day: 'numeric' }))
  const date = $derived(formatter.format(new Date(expense.date)))
</script>

{#if identity !== undefined}
  <Async store={combined(accounts.get(identity), contacts)}>
    {#snippet awaited([account, contacts])}
      {@const contact = contacts.find((c) => c.identity === identity)}
      <Panel
        href={`/contacts/${contact?.id}/`}
        class="bg-constructive/20 border-constructive/30"
        {highlighted}>
        {#snippet left()}
          <div class="flex items-center gap-3">
            <Avatar {account} />
            <div class="flex flex-col text-left">
              <span>{account.name}</span>
              <span class="text-sm text-muted-foreground">
                {date}
              </span>
            </div>
          </div>
        {/snippet}
        {#snippet right()}
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
        {/snippet}
      </Panel>
    {/snippet}
  </Async>
{/if}
