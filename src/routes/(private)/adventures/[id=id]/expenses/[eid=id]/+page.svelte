<script lang="ts">
  import { Async } from 'svas'
  import { Pencil } from '@lucide/svelte'
  import { Attachments } from '@/expenses/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { expenses } from '@/adventures/ui'
  import { adventures } from '@/adventures'
  import { Actions, Return } from '$com/shell'
  import { back } from '$com/history'
  import { page } from '$app/state'

  const { Delete, Details } = expenses

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
          {#if !adventure.archived}
            <Header.Actions>
              <Delete
                adventure={adventure.id}
                id={expense.id}
                ondelete={() => back(`/adventures/${id}/`)} />
            </Header.Actions>
          {/if}
        </Header.Root>
      </Section>

      {#if expense.attachments.length > 0}
        <Attachments attachments={expense.attachments} editable={false} />
      {/if}

      <Section>
        <Details.Description {expense} />
      </Section>

      <Section>
        <Details.Totals {expense} />
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
