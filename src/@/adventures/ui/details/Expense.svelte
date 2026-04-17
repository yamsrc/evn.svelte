<script lang="ts">
  import { Async } from 'svas'
  import { Paperclip } from '@lucide/svelte'
  import { account as me } from '@/iam'
  import { Card } from '@/expenses/ui/views'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { date } from '$lib/tools'
  import { locale } from '$lib/intl'
  import { Separator } from '$com/separator'
  import { dict } from '../intl'
  import type { Props } from './Expense'

  const { adventure, expense }: Props = $props()

  const description = $derived(
    `${date(expense.date, $locale)}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Card.Root href={`/adventures/${adventure.id}/expenses/${expense.id}/`} class="w-full">
  <Card.Row>
    <Async store={accounts.get(expense.payer)}>
      {#snippet awaited(account)}
        <div class="flex items-center gap-3 min-w-0">
          <Avatar {account} class="size-8" />
          <span>{expense.payer === $me?.id ? $dict.me : account.name}</span>
        </div>
      {/snippet}
    </Async>
    <Card.Metric amount={expense.amount} label={$dict.expenses.paid} />
  </Card.Row>
  <Separator />
  <Card.Row>
    <Card.Side class="flex-1">
      <div class="flex items-center gap-1">
        {#if expense.attachments.length > 0}
          <Paperclip size={14} class="text-muted-foreground" />
        {/if}
        <span>{expense.title}</span>
      </div>
      <p class="text-sm text-muted-foreground">{description}</p>
    </Card.Side>
    <Card.Side align="end">
      <span class="font-normal text-muted-foreground">{adventure.title}</span>
    </Card.Side>
  </Card.Row>
</Card.Root>
