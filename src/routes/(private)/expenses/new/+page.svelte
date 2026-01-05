<script lang="ts">
  import { goto } from '$app/navigation'
  import { Back } from '$com/history'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { draft } from '@/expenses/ui'
  import Form from '@/expenses/ui/Form.svelte'
  import type { Expense } from '@/expenses/svc/net'

  function onsend(expense: Expense) {
    goto(`/expenses/${expense.id}`)
  }
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">Evns</Back>
  </Header.Root>
</Section>

<Form bind:expense={$draft} {onsend} />
