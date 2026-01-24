<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { locale, dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Balance, Coins } from '@/app/ui'
  import { numbers, owe } from '@/expenses'
  import { account } from '@/iam'
  import type { Props } from './Props'

  const { expense }: Props = $props()
  const participants = $derived(Object.keys(expense.participants))
  const formatter = $derived(new Intl.DateTimeFormat($locale, { month: 'short', day: 'numeric' }))

  const description = $derived(
    `${formatter.format(new Date(expense.date))}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Button
  href={`/expenses/editor/${expense.id}/`}
  variant="outline"
  class="px-4 py-3 h-fit flex flex-col gap-3 font-normal">
  <div class="w-full flex justify-between items-center">
    <div class="flex flex-col items-start">
      <div>{expense.title}</div>
      <div class="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
    <div class="flex flex-col items-end gap-2">
      <Coins amount={numbers.total(expense)} sign="neutral" />
      <div class="text-muted-foreground text-sm text-nowrap flex items-center gap-2">
        <span>{$dict.expenses.balance.total}</span>
        {#if expense.attachments.length > 0}
          <Paperclip size={14} />
        {/if}
      </div>
    </div>
  </div>
  <Separator />
  <div class="flex justify-between items-center w-full">
    <div class="flex flex-nowrap flex-1 items-center justify-start">
      {#each participants.slice(0, 5) as participant (participant)}
        <Async store={accounts.get(participant)}>
          {#snippet awaited(account)}
            <div class="not-first:-ml-3 shrink-0">
              <Picture {account} class="size-8" />
            </div>
          {/snippet}
        </Async>
      {/each}
      {#if participants.length > 5}
        <div class="ml-2">
          +{participants.length - 5}
        </div>
      {/if}
    </div>
    <Balance
      balance={owe(expense.participants, expense.extras, $account?.id)}
      class="flex-col-reverse items-end" />
  </div>
</Button>
