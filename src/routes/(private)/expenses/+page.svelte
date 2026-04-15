<script lang="ts">
  import { Async, combined } from 'svas'
  import { Receipts } from '@/receipts/ui'
  import { receipts, filter as filterReceipts } from '@/receipts'
  import { scope } from '@/notifications'
  import { account } from '@/iam'
  import { Actions, Expenses, Create } from '@/expenses/ui'
  import { expenses, filter as filterExpenses } from '@/expenses'
  import { hints } from '@/app/ui/hint'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import Adventures from '@/adventures/ui/Adventures.svelte'
  import { Hint } from '@/adventures/ui'
  import { adventures, filter as filterAdventures } from '@/adventures'
  import { Avatar } from '@/accounts/ui'
  import { Input } from '$ui/input'
  import { dict } from '$lib/intl'

  let search = $state('')

  const expensesNotifications = scope({ domain: 'expenses' })
  const transfersNotifications = scope({ domain: 'contacts', event: 'transferred' })
  const adventuresNotifications = scope({ domain: 'adventures' })
  const receiptsNotifications = scope({ domain: 'receipts' })
  const notifications = $derived([...$expensesNotifications, ...$transfersNotifications])
  const adventuresHint = $derived($hints?.['adventures'] !== true && !search)
</script>

<Async store={combined(expenses, adventures, receipts, account)}>
  {#snippet awaited([expenses, adventures, receipts, account])}
    {@const filteredExpenses = filterExpenses(expenses, search)}
    {@const filteredReceipts = filterReceipts(receipts, search)}
    {@const filteredAdventures = filterAdventures(adventures, search)}
    {@const empty = filteredExpenses.length === 0 && filteredAdventures.length === 0}

    <Section>
      <Header.Root>
        <Header.Title>{$dict.expenses.title}</Header.Title>
        <Header.Actions>
          <Header.Button href="/me/" id="header-me-button" variant="ghost">
            <Avatar
              {account}
              style="view-transition-name: my-avatar; view-transition-class: transition-morph;" />
          </Header.Button>
        </Header.Actions>
      </Header.Root>
    </Section>

    {#if expenses.length || adventures.length || receipts.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>
    {/if}

    {#if filteredAdventures.length > 0 || adventuresHint}
      <Section class="space-y-2">
        <h2>{$dict.adventures.title}</h2>
        {#if filteredAdventures.length > 0}
          <Adventures adventures={filteredAdventures} notifications={$adventuresNotifications} />
        {:else if adventuresHint}
          <Hint />
        {/if}
      </Section>
    {/if}

    {#if filteredExpenses.length > 0 || filteredReceipts.length > 0}
      <Section class="space-y-2">
        <h2>{$dict.expenses.expenses.title}</h2>
        <Receipts receipts={filteredReceipts} notifications={$receiptsNotifications} />
        <Expenses expenses={filteredExpenses} {notifications} />
      </Section>
    {/if}

    {#if expenses.length === 0 && receipts.length === 0}
      <Section class="m-auto flex flex-col items-center justify-center gap-2">
        <h2>{$dict.expenses.empty.title}</h2>
        <p>{$dict.expenses.empty.description}</p>
        <Create />
      </Section>
    {/if}

    {#if search && empty}
      <Section>
        <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
      </Section>
    {/if}
  {/snippet}
</Async>

<Actions />
