<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Actions, Return } from '$com/shell'
  import { adventures } from '@/adventures'
  import { ExpenseDetails } from '@/adventures/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { Attachments } from '@/expenses/ui'

  const id = $derived(page.params.id) as string
  const eid = $derived(page.params.eid) as string
</script>

<Return href="/adventures/{id}/" />

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((a) => a.id === id)}
    {@const expense = adventure?.expenses.find((e) => e.id === eid)}

    {#if adventure && expense}
      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
        </Header.Root>
      </Section>

      <Attachments attachments={expense.attachments} editable={false} />

      <Section>
        <ExpenseDetails.Description {expense} />
      </Section>

      <Section>
        <ExpenseDetails.Totals {expense} />
      </Section>

      <Actions>
        <Action
          id="adventures-expense-edit-action"
          href={`/adventures/${id}/expenses/editor/${eid}/`}>
          <Pencil />
        </Action>
      </Actions>
    {/if}
  {/snippet}
</Async>
