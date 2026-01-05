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
  import type { Expense } from '@/expenses'

  let { participants = $bindable<Expense['participants']>({}) }: Props = $props()

  $effect.pre(() => {
    if ($account?.id && !participants[$account.id]) participants[$account.id] = { amount: 0 }
  })

  const participantIds = $derived(Object.keys(participants))
  const otherIds = $derived(participantIds.filter((id) => id !== $account?.id))

  let total = $state(0)

  function updateTotal() {
    total = Object.values(participants).reduce((acc, participant) => acc + participant.amount, 0)
  }

  $effect.pre(() => updateTotal())

  const oninput = (id: string) => (amount: number) => {
    participants = {
      ...participants,
      [id]: {
        ...participants[id],
        amount,
      },
    }

    updateTotal()
  }
</script>

{#snippet spendingItem(account: Account, participant: Expense['participants'][string])}
  <div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-2 flex-1">
      <Picture {account} class="size-8" />
      <!-- TODO: Me -->
      <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{account.name}</span>
    </div>
    <Amount class="w-24" oninput={oninput(account.id)} value={participant.amount ?? 0} />
  </div>
{/snippet}

<Section class="flex flex-col gap-1.5">
  <h2>{$dict.expenses.spendings.title}</h2>

  <Card.Root class="bg-background w-full p-4">
    <Card.Content class="space-y-2 p-0">
      {#if $account?.id && participants[$account.id]}
        {@render spendingItem($account, participants[$account.id])}
      {/if}
      {#each otherIds as id (id)}
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            {@render spendingItem(account, participants[id])}
          {/snippet}
        </Async>
      {/each}
      <!-- TODO: Add extras -->
      <Separator />
      <div class="flex items-center justify-between gap-2 min-h-12">
        <span>Total</span>
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold">{currency(total)}</span>
          <Coins class="text-muted-foreground" size={16} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <Button size="lg" variant="secondary" class="w-full" href="/expenses/add/">
    <Plus />
    Add participant
  </Button>
</Section>
