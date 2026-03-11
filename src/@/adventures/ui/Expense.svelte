<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { locale } from '$lib/intl'
  import { date } from '$lib/tools'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Card } from '@/expenses/ui/views'
  import { account as me } from '@/iam'
  import { dict } from './intl'
  import type { Props } from './Expense'

  const { adventure, expense, title }: Props = $props()

  const description = $derived(
    `${date(expense.date, $locale)}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Card.Root href={`/adventures/${adventure}/expenses/editor/${expense.id}`} class="w-full">
  <Card.Row>
    <Async store={accounts.get(expense.payer)}>
      {#snippet awaited(account)}
        <div class="flex items-center gap-3 min-w-0">
          <Picture {account} class="size-8" />
          <span>{expense.payer === $me?.id ? $dict.me : account.name}</span>
        </div>
      {/snippet}
    </Async>
    <Card.Metric amount={expense.amount} label={$dict.expenses.paid}>
      {#if expense.attachments.length > 0}
        <Paperclip class="size-4 text-muted-foreground" />
      {/if}
    </Card.Metric>
  </Card.Row>
  <Separator />
  <Card.Row>
    <Card.Side class="flex-1">
      <span>{expense.title}</span>
      <p class="text-sm text-muted-foreground">{description}</p>
    </Card.Side>
    <Card.Side align="end">
      <span class="font-normal text-muted-foreground">{title}</span>
    </Card.Side>
  </Card.Row>
</Card.Root>
