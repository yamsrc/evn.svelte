<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { total } from '@/expenses'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import type { Props } from './Spendings'
  import type { Account } from '@/accounts'
  import type { Extra, Participant } from '@/expenses'

  let {
    participants = $bindable<Record<string, Participant>>({}),
    extras = $bindable<Extra[]>([]),
  }: Props = $props()

  const participantIds = $derived(Object.keys(participants))
  const otherIds = $derived(participantIds.filter((id) => id !== $me?.id))
  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-28 flex-1'
</script>

{#snippet spendingItem(account: Account)}
  {@const name = account?.id === $me?.id ? $dict.expenses.me : account.name}
  <div class="flex flex-nowrap items-center justify-between gap-2">
    <div class="flex items-center gap-2 overflow-hidden flex-1">
      <div class="shrink-0">
        <Picture {account} class="size-8" />
      </div>
      <div class={nameClass}>
        <TextEllipsis>{name}</TextEllipsis>
      </div>
    </div>
    <Amount class={amountClass} bind:value={participants[account.id].amount} />
  </div>
{/snippet}

<Section class="flex flex-col gap-1.5">
  <h2>{$dict.expenses.spendings.title}</h2>

  <Card.Root class="bg-background p-4">
    <Card.Content class="space-y-2 p-0">
      {#if $me?.id && participants[$me.id]}
        {@render spendingItem($me)}
      {/if}
      {#each otherIds as id (id)}
        <Separator />
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            {@render spendingItem(account)}
          {/snippet}
        </Async>
      {/each}

      {#each extras as extra, i (i)}
        <Separator />
        <div class="flex flex-col gap-2">
          <div class="flex flex-nowrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 overflow-hidden flex-1">
              <div class={nameClass}>
                <TextEllipsis>
                  {extra.comment ?? $dict.expenses.spendings.extras.title}
                </TextEllipsis>
              </div>
            </div>
            <Amount class={amountClass} bind:value={extras[i].amount} />
          </div>
          {#if i > 0}
            <div class="text-sm">{$dict.expenses.spendings.extras.description}</div>
          {/if}
        </div>
      {/each}

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

  <Button
    id="expenses-spendings-add-participants-button"
    size="lg"
    variant="secondary"
    class="w-full"
    href="participants/"
  >
    <Plus />
    {$dict.expenses.participants.add.label}
  </Button>
</Section>
