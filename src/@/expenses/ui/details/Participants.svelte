<script lang="ts">
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict } from '$lib/intl'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Coins } from '@/app/ui'
  import { account as me } from '@/iam'
  import type { Props } from './Participants'

  const { expense }: Props = $props()

  const participants = $derived(Object.keys(expense.participants))
</script>

<Card.Root class="bg-background p-4">
  <Card.Content class="space-y-2 p-0">
    {#each participants as participant, i (participant)}
      {#if i > 0}
        <Separator />
      {/if}
      <div class="flex flex-nowrap items-center justify-between gap-2 min-h-13">
        <div class="flex items-center gap-2 overflow-hidden flex-1">
          <Async store={accounts.get(participant)}>
            {#snippet awaited(account)}
              {@const name = participant === $me?.id ? $dict.expenses.me : account.name}
              <div class="shrink-0">
                <Picture {account} class="size-8" />
              </div>
              <div class="text-start text-base font-normal flex-1 min-w-0 flex">
                <TextEllipsis>{name}</TextEllipsis>
              </div>
            {/snippet}
          </Async>
        </div>
        <Coins amount={expense.participants[participant].amount} sign="neutral" />
      </div>
    {/each}

    {#each expense.extras as extra, i (i)}
      {#if i > 0}
        <Separator />
      {/if}
      <div class="flex flex-nowrap items-center justify-between gap-2">
        <div class="text-start text-base font-normal flex-1 min-w-0 flex">
          <TextEllipsis>
            {extra.comment ?? $dict.expenses.spendings.extras.title}
          </TextEllipsis>
        </div>
        <Coins amount={extra.amount} sign="neutral" />
      </div>
    {/each}
  </Card.Content>
</Card.Root>
