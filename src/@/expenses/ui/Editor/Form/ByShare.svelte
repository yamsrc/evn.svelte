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
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import { split, type Props } from './ByShare'
  import { getContext } from './Context'
  import ShareAmount from './ShareAmount.svelte'

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-48 flex-1'

  let { value = $bindable() }: Props = $props()

  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const total = $derived(ctx.total)
  const overpayment = $derived(Math.max(paid - total, 0))

  const participants = $derived(Object.keys(value.participants))

  const shares = $state(split(value))

  $effect(() => {
    const parts = Object.values(shares).reduce((acc, share) => acc + share, 0)
    let sum = 0

    for (const [i, id] of participants.entries()) {
      const share = shares[id] ?? 0
      const amount = Math.floor((total / parts) * share)
      const last = i === participants.length - 1

      if (last) value.participants[id].amount = total - sum
      else value.participants[id].amount = amount

      sum += amount
    }
  })
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
      <ShareAmount
        id={`expenses-participant-share-${i}`}
        class={amountClass}
        amount={value.participants[id]?.amount ?? 0}
        bind:share={shares[id]} />
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
