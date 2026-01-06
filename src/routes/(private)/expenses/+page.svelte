<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
  import { Expenses } from '@/expenses/ui'

  let search = $state('')
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.expenses.title}</Header.Title>
  </Header.Root>
</Section>
<Section>
  <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
</Section>

<Async store={expenses}>
  {#snippet awaited(expenses)}
    <Expenses {expenses} {search} />
  {/snippet}
</Async>
