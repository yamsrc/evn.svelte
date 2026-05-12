<script lang="ts">
  import { numbers } from '@/expenses'
  import { CoinsInput } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { getContext } from './Context'
  import type { Props } from './Total'

  let { value = $bindable(), total = $bindable() }: Props = $props()

  const ctx = getContext()
  const ids = $derived(Object.keys(value.participants))

  function oninput(amount: number) {
    ctx.derived = amount === 0

    if (ids.length > 0) {
      let touched = 0

      for (const id of ids)
        if (value.participants[id].touched === true) touched += value.participants[id].amount

      if (touched >= amount) return

      const untouched = ids.filter((id) => value.participants[id].touched !== true)

      if (untouched.length > 0) {
        const parts = numbers.split(amount - touched, untouched)

        for (const [id, part] of Object.entries(parts)) value.participants[id].amount = part
      }
    }

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
