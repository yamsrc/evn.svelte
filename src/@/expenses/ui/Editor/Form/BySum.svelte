<script lang="ts">
  import { Async } from 'svas'
  import { account as me } from '@/iam'
  import { CoinsInput } from '@/app/ui'
  import { Avatar, Title } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { currency } from '$lib/tools'
  import { dict, locale } from '$lib/intl'
  import { Ellipsis } from '$com/text'
  import { Separator } from '$com/separator'
  import { getContext } from './Context'
  import type { Props } from './BySum'

  const amountClass = 'min-w-24 max-w-28 flex-1'

  let { value = $bindable() }: Props = $props()

  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const overpayment = $derived(Math.max(paid - value.total.amount, 0))
  const participants = $derived(Object.keys(value.participants))

  function oninput(amount: number, id: string) {
    value.participants[id].amount = amount
    value.participants[id].touched = true

    // ping svelte
    value = { ...value }
  }
</script>

<div class="space-y-2">
  {#each participants as id, i (id)}
    {#if i > 0}
      <Separator />
    {/if}
    <div class="flex flex-nowrap items-center justify-between gap-2 min-h-13">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            {@const name = id === $me?.id ? $dict.expenses.me : account.name}
            <Avatar {account} class="size-8 shrink-0" />
            <Title account={{ ...account, name }} class="text-start text-base font-normal" />
          {/snippet}
        </Async>
      </div>
      <CoinsInput
        id={`expenses-participant-amount-${i}`}
        class={amountClass}
        value={value.participants[id].amount}
        oninput={(amount) => oninput(amount, id)} />
    </div>
  {/each}

  <!-- Extras -->
  {#each value.extras as extra, i (i)}
    {#if i > 0}
      <Separator />
    {/if}
    <div class="flex flex-col gap-2">
      <div class="flex flex-nowrap items-center justify-between gap-2">
        <Ellipsis class="text-start text-base font-normal flex-1 min-w-0">
          {extra.comment ?? $dict.expenses.spendings.extras.title}
        </Ellipsis>
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
