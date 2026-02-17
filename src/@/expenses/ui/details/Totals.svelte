<script lang="ts">
  import { Async } from 'svas'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict } from '$lib/intl'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Coins } from '@/app/ui'
  import { numbers } from '@/expenses'
  import { account as me } from '@/iam'
  import type { Props } from './Totals'

  const { expense }: Props = $props()

  const payers = $derived(
    Object.keys(expense.participants).filter((p) => expense.participants[p].paid !== undefined),
  )
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.spendings.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={numbers.total(expense)} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.payers.title}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      {#each payers as payer (payer)}
        <Async store={accounts.get(payer)}>
          {#snippet awaited(account)}
            {@const name = payer === $me?.id ? $dict.expenses.me : account.name}
            <div class="flex items-center gap-2">
              <Picture {account} class="size-8" />
              <TextEllipsis>{name}</TextEllipsis>
            </div>
          {/snippet}
        </Async>
      {/each}
    </Card.Content>
  </Card.Root>
</div>
