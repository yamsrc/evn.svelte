<script lang="ts">
  import { dict } from '$lib/intl'
  import { CoinsInput } from '@/app/ui'
  import type { Props } from './Total'

  let { amount = $bindable() }: Props = $props()
</script>

<div class="flex items-center justify-between gap-4">
  <div class="ps-3">{$dict.expenses.spendings.total}</div>
  <CoinsInput
    id="adventures-expense-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    bind:value={amount} />
</div>
