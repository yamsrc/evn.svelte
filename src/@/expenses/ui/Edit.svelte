<script lang="ts">
  import { goto } from '$app/navigation'
  import { NEWID } from '$lib/tools'
  import { add, update } from '@/expenses'
  import Form from './Form.svelte'
  import type { Props } from './Edit'
  import type { Value } from './Form'

  let { id, draft = $bindable() }: Props = $props()

  const isNew = $derived(id === NEWID)

  async function onsubmit(value: Value) {
    const expense = isNew ? await add(value) : await update(id, value)

    if (expense instanceof Error) return expense

    await goto(`/expenses/${expense.id}/`)
  }
</script>

{#if draft?.value}
  <Form bind:value={draft.value} {onsubmit} />
{/if}
