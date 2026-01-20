<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict, locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { numbers } from '@/expenses'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import { getContext } from './Context'
  import ShareAmount from './ShareAmount.svelte'
  import type { Props } from './ByShare'

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-48 flex-1'

  let { value = $bindable() }: Props = $props()

  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const total = $derived(ctx.total)
  const overpayment = $derived(Math.max(paid - total, 0))
  const participants = $derived(Object.keys(value.participants))
  const payer = $derived(participants.find((id) => value.participants[id].paid !== undefined))
  const payerPaid = $derived(payer ? (value.participants[payer].paid ?? 0) : 0)

  const shares = $derived(
    Object.fromEntries(participants.map((id) => [id, value.participants[id].shares ?? 0])),
  )

  const amounts = $derived(numbers.amounts(value, shares))

  function sign(id: string) {
    const amount = amounts[id] ?? 0

    const owed = id === payer ? payerPaid - amount : -amount

    return owed > 0 ? 'positive' : owed < 0 ? 'negative' : 'none'
  }
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
          bind:share={value.participants[id].shares}
          sign={sign(id)} />
      {/if}
    </div>
  {/each}

  <div class="py-2">
    <Button
      id="expenses-spendings-add-participants-button"
      size="lg"
      variant="secondary"
      class="w-full"
      href="participants/">
      <Plus />
      {$dict.expenses.participants.add.label}
    </Button>
  </div>

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
        <Amount
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
