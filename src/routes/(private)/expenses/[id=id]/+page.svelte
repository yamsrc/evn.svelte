<script lang="ts">
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
  import Form from '@/expenses/ui/Form.svelte'

  const id = $derived(page.params.id as string)
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">Evns</Back>
  </Header.Root>
</Section>

<Async store={expenses.get(id)}>
  {#snippet awaited(expense)}
    <Form {expense} />
  {/snippet}
</Async>
