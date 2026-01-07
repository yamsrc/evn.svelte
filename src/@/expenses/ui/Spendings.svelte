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
  import { total } from '@/expenses'
  import { account } from '@/iam'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import type { Props } from './Spendings'
  import type { Account } from '@/accounts'
  import type { Extra, Participant } from '@/expenses'

  let {
    participants = $bindable<Record<string, Participant>>({}),
    extras = $bindable<Extra[]>([]),
  }: Props = $props()

  $effect.pre(() => {
    if ($account?.id && !participants[$account.id]) participants[$account.id] = { amount: 0 }

    if (extras.length === 0) extras.push({ amount: 0 })
  })

  const participantIds = $derived(Object.keys(participants))
  const otherIds = $derived(participantIds.filter((id) => id !== $account?.id))
  const nameClass =
    'inline text-start flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-normal'
</script>

{#snippet spendingItem(account: Account)}
  {@const name = account?.id === $me?.id ? $dict.expenses.me : account.name}
  <div class="flex flex-nowrap items-center justify-between gap-2">
    <div class="flex items-center gap-2 flex-1 overflow-hidden">
      <Picture {account} class="size-8" />
      <div class={nameClass}>{name}</div>
    </div>
    <Amount class="flex-1 max-w-24 shrink" bind:value={participants[account.id].amount} />
  </div>
{/snippet}

<Section class="flex flex-col gap-1.5">
  <h2>{$dict.expenses.spendings.title}</h2>

  <Card.Root class="bg-background w-full p-4">
    <Card.Content class="space-y-2 p-0">
      {#if $account?.id && participants[$account.id]}
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
            <div class={nameClass}>
              {$dict.expenses.spendings.extras.title}
            </div>
          </div>
          <Amount class="flex-1 max-w-24 shrink" bind:value={extras[0].amount} />
        </div>
        <div class="text-sm">{$dict.expenses.spendings.extras.description}</div>
      </div>

      <Separator />
      <div class="flex items-center justify-between gap-2 min-h-12">
        <span>{$dict.expenses.spendings.total}</span>
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold">{currency(total({ participants, extras }))}</span>
          <Coins class="text-muted-foreground" size={16} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <Button size="lg" variant="secondary" class="w-full" href="add/">
    <Plus />
    {$dict.expenses.participants.add.label}
  </Button>
</Section>
