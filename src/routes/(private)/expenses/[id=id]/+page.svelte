<script lang="ts">
  import { ok } from 'svas'
  import { writable } from 'svelte/store'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
  import Form from '@/expenses/ui/Form.svelte'
  import type { Expense } from '@/expenses'

  const id = $derived(page.params.id as string)
  const editableExpense = writable<Expense | undefined>(undefined)

  $effect(() => {
    const unsubscribe = expenses.get(id).subscribe((expense) => {
      if (ok(expense)) editableExpense.set(expense)
    })

    return unsubscribe
  })
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">Evns</Back>
  </Header.Root>
</Section>

{#if $editableExpense}
  <Form bind:expense={$editableExpense} />
{/if}
