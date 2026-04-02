<script lang="ts">
  import { Async } from 'svas'
  import { account as me } from '@/iam'
  import { numbers } from '@/expenses'
  import { CoinsInput } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { currency } from '$lib/tools'
  import { dict, locale } from '$lib/intl'
  import { Ellipsis } from '$com/text'
  import { Separator } from '$com/separator'
  import { getContext } from './Context'
  import type { Props } from './BySum'

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-28 flex-1'

  let { value = $bindable(), total = $bindable() }: Props = $props()

  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const overpayment = $derived(Math.max(paid - total, 0))
  const participants = $derived(Object.keys(value.participants))

  function oninput() {
    if (value.calculated === undefined && total === 0) value.calculated = true
    else if (value.calculated !== true) return

    total = numbers.total(value)
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
              <Ellipsis>{name}</Ellipsis>
            </div>
          {/snippet}
        </Async>
      </div>
      <CoinsInput
        id={`expenses-participant-amount-${i}`}
        class={amountClass}
        bind:value={value.participants[id].amount}
        {oninput} />
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
            <Ellipsis>
              {extra.comment ?? $dict.expenses.spendings.extras.title}
            </Ellipsis>
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
