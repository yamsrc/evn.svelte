<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses, filter } from '@/expenses'
  import { Actions, Expenses, Create } from '@/expenses/ui'
  import { account } from '@/iam'
  import { notifications } from '@/notifications'

  let search = $state('')
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.expenses.title}</Header.Title>
  </Header.Root>
</Section>

<Async store={combined(expenses, notifications)}>
  {#snippet awaited([expenses, notifications])}
    {@const filteredExpenses = filter(expenses, search)}
    {@const empty = filteredExpenses.length === 0}
    {@const expensesNotifications = notifications.filter(
      (n) => n.domain === 'expenses' || (n.domain === 'contacts' && n.event === 'transferred'),
    )}

    {#if expenses.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>
      <Expenses {expenses} {search} notifications={expensesNotifications} />
      {#if search && empty}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
        </Section>
      {/if}
    {:else if $account}
      <Section class="m-auto flex flex-col items-center justify-center gap-2">
        <h2>{$dict.expenses.empty.title}</h2>
        <p>{$dict.expenses.empty.description}</p>
        <Create />
      </Section>
    {/if}
  {/snippet}
</Async>

<Actions />
