<script lang="ts">
  import { CoinsInput } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { redistribute, type Props } from './Total'
  import { getContext } from './Context'

  let { value = $bindable(), total = $bindable() }: Props = $props()

  const ctx = getContext()

  function oninput(amount: number) {
    ctx.derived = amount === 0
    redistribute(value, amount)
    total = amount
  }
</script>

<div class="flex items-center justify-between gap-4">
  <div class="pl-3">{$dict.expenses.spendings.total}</div>
  <CoinsInput
    id="expenses-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    value={total}
    {oninput} />
</div>
