<script lang="ts">
  import { Async } from 'svas'
  import { Pencil } from '@lucide/svelte'
  import { Looking } from '@/notifications/ui'
  import { Attachments, Details } from '@/expenses/ui'
  import { expenses } from '@/expenses'
  import { Action, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { page } from '$app/state'

  const id = $derived(page.params.id) as string
</script>

<Looking domain="expenses" key={id} />

<Async store={expenses}>
  {#snippet awaited(expenses)}
    {@const expense = expenses.find((e) => e.id === id)}

    {#if expense}
      <Section>
        <Header.Root>
          <Header.Title>{$dict.expenses.title}</Header.Title>
        </Header.Root>
      </Section>

      {#if expense.attachments.length > 0}
        <Attachments attachments={expense.attachments} />
      {/if}

      <Section>
        <Details.Description {expense} />
      </Section>

      <Section>
        <Details.Totals {expense} />
      </Section>

      <Section>
        <Details.Participants {expense} />
      </Section>
    {/if}
  {/snippet}
</Async>

<Actions>
  <Action id="expenses-edit-action" href={`/expenses/editor/${id}/`}>
    <Pencil />
  </Action>
</Actions>
