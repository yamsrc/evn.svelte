<script lang="ts">
  import { Async } from 'svas'
  import { TextEllipsis } from '$com/text-ellipsis'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Coins } from '@/app/ui'
  import { account as me } from '@/iam'
  import { dict } from '../../intl'
  import type { Props } from './Totals'

  const { expense }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins
        id="adventures-details-total"
        amount={expense.amount}
        sign="neutral"
        class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.paidBy}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Async store={accounts.get(expense.payer)}>
        {#snippet awaited(account)}
          {@const name = expense.payer === $me?.id ? $dict.me : account.name}
          <div class="flex items-center gap-2">
            <Picture {account} class="size-8" />
            <TextEllipsis>{name}</TextEllipsis>
          </div>
        {/snippet}
      </Async>
    </Card.Content>
  </Card.Root>
</div>
