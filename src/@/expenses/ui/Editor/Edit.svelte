<script lang="ts">
  import { back } from '$com/history'
  import { add, update } from '@/expenses'
  import { Form } from './Form'
  import type { Value } from './Context'
  import type { Props } from './Edit'

  let { id, value = $bindable() }: Props = $props()

  async function onsubmit(value: Value) {
    const expense = id === undefined ? await add(value) : await update(id, value)

    if (expense instanceof Error) return expense

    await back('/expenses/')
  }
</script>

<Form bind:value {onsubmit} />
