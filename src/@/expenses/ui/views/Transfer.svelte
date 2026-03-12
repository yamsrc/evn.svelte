<script lang="ts">
  import { Async, combined } from 'svas'
  import { CircleArrowLeft, CircleArrowRight } from '@lucide/svelte'
  import { account } from '@/iam'
  import { contacts } from '@/contacts'
  import Coins from '@/app/ui/Coins.svelte'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { date } from '$lib/tools'
  import { grammar } from '$lib/intl'
  import { locale } from '$lib/intl'
  import { Attention } from '$com/shell'
  import { Panel } from '$com/panel'
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
</script>

{#if identity !== undefined}
  <Async store={combined(accounts.get(identity), contacts)}>
    {#snippet awaited([account, contacts])}
      {@const contact = contacts.find((c) => c.identity === identity)}
      <Panel
        href={contact ? `/contacts/${contact.identity}/` : undefined}
        class={[
          'bg-constructive/20! border-constructive/30! hover:bg-constructive/25! hover:border-constructive/35!',
          highlighted && 'ring-inset ring-1 ring-constructive/30',
        ]}>
        {#snippet left()}
          <div class="flex items-center gap-3">
            <Avatar {account} />
            <div class="flex flex-col text-left">
              <span class="inline-flex items-center gap-1">
                <span>{account.name}</span>
                {#if highlighted}
                  <Attention class="mx-1" />
                {/if}
              </span>
              <span class="text-sm text-muted-foreground">
                {date(expense.date, $locale)}
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
