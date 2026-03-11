<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Action, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
  import { Attachments, Details } from '@/expenses/ui'
  import { seen } from '@/notifications'

  const id = $derived(page.params.id) as string

  $effect(() => {
    void seen('expenses', id)
  })
</script>

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

      <Actions>
        <Action id="expenses-edit-action" href={`/expenses/editor/${id}/`}>
          <Pencil />
        </Action>
      </Actions>
    {/if}
  {/snippet}
</Async>
