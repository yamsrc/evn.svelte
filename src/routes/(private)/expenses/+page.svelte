<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { adventures } from '@/adventures'
  import Adventures from '@/adventures/ui/Adventures.svelte'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses, filter } from '@/expenses'
  import { Actions, Expenses, Create } from '@/expenses/ui'
  import { account } from '@/iam'
  import { scope } from '@/notifications'

  let search = $state('')

  const expensesNotifications = scope({ domain: 'expenses' })
  const transfersNotifications = scope({ domain: 'contacts', event: 'transferred' })
  const adventuresNotifications = scope({ domain: 'adventures' })
  const notifications = $derived([...$expensesNotifications, ...$transfersNotifications])
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.expenses.title}</Header.Title>
  </Header.Root>
</Section>

<Async store={combined(expenses, adventures)}>
  {#snippet awaited([expenses, adventures])}
    {@const filteredExpenses = filter(expenses, search)}
    {@const empty = filteredExpenses.length === 0}

    <Section class="space-y-2">
      <Adventures {adventures} notifications={$adventuresNotifications} />
    </Section>

    {#if expenses.length}
      <Section class="space-y-2">
        <h2>{$dict.expenses.expenses.title}</h2>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>
      <Expenses {expenses} {search} {notifications} />
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
