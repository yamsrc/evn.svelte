<script lang="ts">
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
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

<Section class="flex flex-col gap-1.5">
  <div class="flex items-center gap-4 min-h-12">
    <h2>{$dict.expenses.spendings.total}</h2>
    <Amount id="expenses-total-input" class="min-w-32" value={total} {oninput} />
  </div>
</Section>
