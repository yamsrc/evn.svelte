<script lang="ts">
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { split } from '@/expenses'
  import Amount from './Amount.svelte'
  import { getContext } from './Context'
  import type { Props } from './Total'

  const { value = $bindable() }: Props = $props()
  const ctx = getContext()
  const total = $derived(ctx.total)

  const participantIds = $derived(Object.keys(value.participants))
  const isEvenlySplit = $derived(split.isEvenlySplit(value.participants, participantIds))

  function onTotalChange(newTotal: number) {
    // Only update if amounts are currently evenly split
    if (isEvenlySplit && participantIds.length > 0) {
      const splitAmounts = split.splitEvenly(newTotal, participantIds)

      for (const [id, amount] of Object.entries(splitAmounts))
        value.participants[id].amount = amount
    }
  }
</script>

<Section class="flex flex-col gap-1.5">
  <div class="flex items-center gap-4 min-h-12">
    <h2>{$dict.expenses.spendings.total}</h2>
    <Amount id="expenses-total-input" class="min-w-32" value={total} oninput={onTotalChange} />
  </div>
</Section>
