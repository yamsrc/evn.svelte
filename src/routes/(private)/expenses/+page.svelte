<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.expenses.title}</Header.Title>
  </Header.Root>
</Section>

<Async store={expenses}>
  {#snippet awaited(expenses)}
    {expenses.length}
  {/snippet}
</Async>
