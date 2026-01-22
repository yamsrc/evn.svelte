<script lang="ts">
  import { dict } from '$lib/intl'
  import { numbers } from '@/expenses'
  import Amount from './Amount.svelte'
  import type { Props } from './Total'

  let { value = $bindable(), total = $bindable() }: Props = $props()

  const participantIds = $derived(Object.keys(value.participants))
  const isEvenlySplit = $derived(numbers.even(value.participants, participantIds))

  function oninput(amount: number) {
    total = amount

    if (isEvenlySplit && participantIds.length > 0) {
      const splitAmounts = numbers.split(amount, participantIds)

      for (const [id, amount] of Object.entries(splitAmounts))
        value.participants[id].amount = amount
    }
  }
</script>

<div class="flex items-center justify-between gap-4">
  <div class="pl-3">{$dict.expenses.spendings.total}</div>
  <Amount
    id="expenses-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    value={total}
    {oninput} />
</div>
