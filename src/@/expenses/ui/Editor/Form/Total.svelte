<script lang="ts">
  import { CoinsInput } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { redistribute, type Props } from './Total'

  let { value = $bindable() }: Props = $props()

  function oninput(amount: number) {
    value.total.amount = amount
    value.total.touched = true
    redistribute(value)
  }
</script>

<div class="flex items-center justify-between gap-4">
  <div class="pl-3">{$dict.expenses.spendings.total}</div>
  <CoinsInput
    id="expenses-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    value={value.total.amount}
    {oninput} />
</div>
