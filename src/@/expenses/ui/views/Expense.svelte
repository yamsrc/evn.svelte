<script lang="ts">
  import { Async } from 'svas'
  import { Paperclip } from '@lucide/svelte'
  import { account } from '@/iam'
  import { numbers, owe } from '@/expenses'
  import { Balance, Coins } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Button } from '$ui/button'
  import { date } from '$lib/tools'
  import { locale, dict } from '$lib/intl'
  import { Attention } from '$com/shell'
  import { Separator } from '$com/separator'
  import type { Props } from './Props'

  const { expense, highlighted }: Props = $props()
  const participants = $derived(Object.keys(expense.participants))
  const description = $derived(
    `${date(expense.date, $locale)}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Button
  href={`/expenses/${expense.id}/`}
  variant="outline"
  size="lg"
  class={[
    'px-4 py-3 h-fit flex flex-col gap-3 relative',
    highlighted && 'ring-inset ring-2 ring-muted-foreground/50',
  ]}>
  <div class="w-full flex justify-between items-start">
    <div class="flex flex-col items-start">
      <div class="flex items-center gap-1">
        {#if expense.attachments.length > 0}
          <Paperclip size={14} class="text-muted-foreground" />
        {/if}
        <span>{expense.title}</span>
        {#if highlighted}
          <Attention class="mx-1" />
        {/if}
      </div>
      <p class="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
    <div class="flex flex-col items-end">
      <Coins amount={numbers.total(expense)} sign="neutral" />
      <p class="text-sm text-muted-foreground">{$dict.expenses.balance.total}</p>
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
