<script lang="ts">
  import { Async } from 'svas'
  import { account as me } from '@/iam'
  import { numbers } from '@/expenses'
  import { CoinsInput } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { currency } from '$lib/tools'
  import { dict, locale } from '$lib/intl'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Separator } from '$com/separator'
  import ShareAmount from './ShareAmount.svelte'
  import { getContext } from './Context'
  import type { Props } from './ByShare'

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-48 flex-1'

  let { value = $bindable() }: Props = $props()

  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const total = $derived(ctx.total)
  const overpayment = $derived(Math.max(paid - total, 0))
  const participants = $derived(Object.keys(value.participants))

  const shares = $derived(
    Object.fromEntries(participants.map((id) => [id, value.participants[id].shares ?? 0])),
  )

  const amounts = $derived(numbers.amounts(value, shares))
</script>

<div class="space-y-2">
  <!-- Participants -->
  {#each participants as id, i (id)}
    {#if i > 0}
      <Separator />
    {/if}
    <div class="flex flex-nowrap items-center justify-between gap-2 min-h-13">
      <div class="flex items-center gap-2 overflow-hidden flex-1">
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            {@const name = id === $me?.id ? $dict.expenses.me : account.name}
            <div class="shrink-0">
              <Picture {account} class="size-8" />
            </div>
            <div class={nameClass}>
              <TextEllipsis>{name}</TextEllipsis>
            </div>
          {/snippet}
        </Async>
      </div>
      {#if value.participants[id]?.shares !== undefined}
        <ShareAmount
          id={`expenses-participant-share-${i}`}
          class={amountClass}
          amount={amounts[id]}
          bind:share={value.participants[id].shares} />
      {/if}
    </div>
  {/each}

  <!-- Extras -->
  {#each value.extras as extra, i (i)}
    {#if i > 0}
      <Separator />
    {/if}
    <div class="flex flex-col gap-2">
      <div class="flex flex-nowrap items-center justify-between gap-2">
        <div class="flex items-center gap-2 overflow-hidden flex-1">
          <div class={nameClass}>
            <TextEllipsis>
              {extra.comment ?? $dict.expenses.spendings.extras.title}
            </TextEllipsis>
          </div>
        </div>
        <CoinsInput
          class={amountClass}
          bind:value={value.extras[i].amount}
          placeholder={i === value.extras.length - 1 ? currency(overpayment, $locale) : '0'} />
      </div>
      {#if i === 0}
        <div class="text-sm text-muted-foreground">
          {$dict.expenses.spendings.extras.description}
        </div>
      {/if}
    </div>
  {/each}
</div>
