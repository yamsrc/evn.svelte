<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { account } from '@/iam'
  import Amount from './Amount.svelte'
  import type { Props } from './Spendings'
  import type { Account } from '@/accounts'

  let { expense = $bindable() }: Props = $props()

  $effect.pre(() => {
    if ($account?.id && !expense.participants[$account.id])
      expense.participants[$account.id] = { amount: 0 }

    if (expense.extras.length === 0) expense.extras.push({ amount: 0 })
  })

  const participantIds = $derived(Object.keys(expense.participants))
  const otherIds = $derived(participantIds.filter((id) => id !== $account?.id))

  const total = $derived(
    Object.values(expense.participants).reduce((acc, participant) => acc + participant.amount, 0) +
      expense.extras[0].amount,
  )
</script>

{#snippet spendingItem(account: Account)}
  <div class="flex flex-nowrap items-center justify-between gap-2">
    <div class="flex items-center gap-2 flex-1 overflow-hidden">
      <Picture {account} class="size-8" />
      <!-- TODO: Me -->
      <div
        class="inline text-start flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap font-normal"
      >
        {account.name}
      </div>
    </div>
    <Amount class="flex-1 max-w-24 shrink" bind:value={expense.participants[account.id].amount} />
  </div>
{/snippet}

<Section class="flex flex-col gap-1.5">
  <h2>{$dict.expenses.spendings.title}</h2>

  <Card.Root class="bg-background w-full p-4">
    <Card.Content class="space-y-2 p-0">
      {#if $account?.id && expense.participants[$account.id]}
        {@render spendingItem($account)}
      {/if}
      {#each otherIds as id (id)}
        <Separator />
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            {@render spendingItem(account)}
          {/snippet}
        </Async>
      {/each}

      <Separator />
      <div class="flex flex-col gap-2">
        <div class="flex flex-nowrap items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-1 overflow-hidden">
            <div
              class="inline text-start flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap font-normal"
            >
              {$dict.expenses.spendings.extras.title}
            </div>
          </div>
          <Amount class="flex-1 max-w-24 shrink" bind:value={expense.extras[0].amount} />
        </div>
        <div class="text-sm">{$dict.expenses.spendings.extras.description}</div>
      </div>

      <Separator />
      <div class="flex items-center justify-between gap-2 min-h-12">
        <span>{$dict.expenses.spendings.total}</span>
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold">{currency(total)}</span>
          <Coins class="text-muted-foreground" size={16} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  {@const href = 'id' in expense ? `/expenses/${expense.id}/add/` : '/expenses/add/'}
  <Button size="lg" variant="secondary" class="w-full" {href}>
    <Plus />
    Add participant
  </Button>
</Section>
