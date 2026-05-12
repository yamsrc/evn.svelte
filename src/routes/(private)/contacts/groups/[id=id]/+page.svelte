<script lang="ts">
  import { Async, ok } from 'svas'
  import { Settings } from '@lucide/svelte'
  import { Looking } from '@/notifications/ui'
  import { account } from '@/iam'
  import { Details } from '@/groups/ui'
  import { groups } from '@/groups'
  import { CreateAction } from '@/expenses/ui'
  import { expenses, numbers, type Expense } from '@/expenses'
  import { Header, Section } from '@/app/ui'
  import { Actions } from '$com/shell'
  import { page } from '$app/state'

  const id = $derived(page.params.id) as string

  /**
   * Returns the expenses that are linked to the group.
   */
  function linked(expenses: Expense[]): Expense[] {
    return expenses.filter((expense) =>
      expense.links?.some((link) => link.type === 'group' && link.id === id),
    )
  }

  function paidByMe(entries: Expense[]): number {
    return entries.reduce(
      (sum, expense) => sum + (expense.participants[$account?.id ?? '']?.paid ?? 0),
      0,
    )
  }
</script>

<Looking domain="groups" key={id} />

<Async store={groups}>
  {#snippet awaited(groups)}
    {#if ok(groups)}
      {@const group = groups.find((group) => group.id === id)}
      {#if group}
        <Section>
          <Header.Root>
            <Header.Title>{group.title ?? group.name}</Header.Title>
            <Header.Actions>
              <Header.Button
                id="groups-view-settings-button"
                href={`/contacts/groups/editor/${id}/`}>
                <Settings />
              </Header.Button>
            </Header.Actions>
          </Header.Root>
        </Section>

        {#if group.picture}
          <Section>
            <Details.Cover
              {group}
              class="w-full h-64 object-cover rounded-xl"
              style="view-transition-name: group-cover; view-transition-class: transition-morph;" />
          </Section>
        {/if}

        <Async store={expenses}>
          {#snippet awaited(expenses)}
            {@const entries = linked(expenses)}
            {@const total = entries.reduce((sum, expense) => sum + numbers.total(expense), 0)}
            {@const paid = paidByMe(entries)}

            <Section>
              <Details.Totals {paid} {total} />
            </Section>

            <Section>
              <Details.Participants identities={group.identities} balances={group.balances} />
            </Section>

            <Section>
              <Details.Expenses expenses={entries} />
            </Section>

            <Actions>
              <CreateAction value={{ links: [{ type: 'group', id }] }} />
            </Actions>
          {/snippet}
        </Async>
      {/if}
    {/if}
  {/snippet}
</Async>
