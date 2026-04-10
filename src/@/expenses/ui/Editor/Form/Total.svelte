<script lang="ts">
  import { numbers } from '@/expenses'
  import { CoinsInput } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { getContext } from './Context'
  import type { Props } from './Total'

  let { value = $bindable(), total = $bindable() }: Props = $props()

  const ctx = getContext()
  const ids = $derived(Object.keys(value.participants))
  const even = $derived(numbers.even(value.participants))

  function oninput(amount: number) {
    ctx.derived = amount === 0

    if (even && ids.length > 0) {
      const splitAmounts = numbers.split(amount, ids)

      for (const [id, amount] of Object.entries(splitAmounts))
        value.participants[id].amount = amount
    }
  }
</script>

<div class="flex items-center justify-between gap-4">
  <div class="pl-3">{$dict.expenses.spendings.total}</div>
  <CoinsInput
    id="expenses-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    bind:value={total}
    {oninput} />
</div>
