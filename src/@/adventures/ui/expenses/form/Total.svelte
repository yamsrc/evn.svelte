<script lang="ts">
  import { CoinsInput } from '@/app/ui'
  import { dict } from '../../intl'
  import type { Props } from './Total'

  let { amount = $bindable() }: Props = $props()
</script>

<div class="flex items-center justify-between gap-4">
  <div class="ps-3">{$dict.expenses.total}</div>
  <CoinsInput
    id="adventures-expense-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    bind:value={amount} />
</div>
