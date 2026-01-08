<script lang="ts">
  import { back } from '$com/history'
  import { NEWID } from '$lib/tools'
  import { add, update } from '@/expenses'
  import { Form } from './Form'
  import type { Value } from './Context'
  import type { Props } from './Edit'

  let { id, value = $bindable() }: Props = $props()

  const isNew = $derived(id === NEWID)

  async function onsubmit(value: Value) {
    const expense = isNew ? await add(value) : await update(id, value)

    if (expense instanceof Error) return expense

    back('/expenses/')
  }
</script>

<Form bind:value {onsubmit} />
