<script lang="ts">
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import { total } from '@/expenses'
  import { owe } from '@/expenses'
  import { account } from '@/iam'
  import type { Props } from './Expense'

  const { expense }: Props = $props()

  const participants = $derived(Object.keys(expense.participants))
</script>

<Button
  href={`/expenses/editor/${expense.id}/`}
  variant="outline"
  class="px-4 py-3 h-fit flex flex-col gap-3 font-normal"
>
  <div class="w-full flex justify-between items-center">
    <div class="flex flex-col items-start">
      <div>{expense.title}</div>
      <div class="text-sm text-muted-foreground">{expense.location}</div>
    </div>
    <div class="flex flex-col items-end">
      <Balance total={total(expense)} class="flex-col-reverse items-end" />
    </div>
  </div>
  <Separator />
  <div class="flex justify-between items-center w-full">
    <div class="flex flex-nowrap flex-1 items-center justify-start">
      {#each participants.slice(0, 5) as participant (participant)}
        <Async store={accounts.get(participant)} class="not-first:-ml-3 shrink-0">
          {#snippet awaited(account)}
            <Picture {account} class="size-8" />
          {/snippet}
        </Async>
      {/each}
      {#if participants.length > 5}
        <div class="ml-2">
          +{participants.length - 5}
        </div>
      {/if}
    </div>
    <Balance balance={owe(expense.participants, $account?.id)} class="flex-col-reverse items-end" />
  </div>
</Button>
