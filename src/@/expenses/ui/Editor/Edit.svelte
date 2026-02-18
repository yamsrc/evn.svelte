<script lang="ts">
  import { back } from '$com/history'
  import { add, update } from '@/expenses'
  import Attachments from '../Attachments.svelte'
  import { Form } from './Form'
  import type { Value } from './Context'
  import type { Props } from './Edit'

  let { id, value = $bindable(), mode = $bindable<'sums' | 'shares'>('sums') }: Props = $props()

  async function onsubmit(value: Value) {
    const expense = id === undefined ? await add(value) : await update(id, value)

    if (expense instanceof Error) return expense

    await back(`/expenses/${expense.id}/`)
  }
</script>

<Attachments bind:attachments={value.attachments} />
<Form bind:value bind:mode {onsubmit} />
