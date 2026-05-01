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

  function shared(entries: Expense[], identities: string[]): Expense[] {
    const me = $account

    if (!me) return []

    const others = identities.filter((identity) => identity !== me.id)

    return entries.filter((expense) => {
      const participants = Object.keys(expense.participants)

      return (
        participants.includes(me.id) && participants.some((identity) => others.includes(identity))
      )
    })
  }

  function paid(entries: Expense[]): number {
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
            {#if ok(expenses)}
              {@const entries = shared(expenses, group.identities)}
              {@const total = entries.reduce((sum, expense) => sum + numbers.total(expense), 0)}
              {@const paidByMe = paid(entries)}

              <Section>
                <Details.Totals paid={paidByMe} {total} />
              </Section>

              <Section>
                <Details.Participants identities={group.identities} expenses={entries} />
              </Section>

              <Section>
                <Details.Expenses expenses={entries} />
              </Section>

              <Actions>
                <CreateAction
                  value={{
                    participants: Object.fromEntries(
                      group.identities.map((identity) => [
                        identity,
                        { amount: 0, shares: 0, paid: $account?.id === identity ? 0 : undefined },
                      ]),
                    ),
                  }} />
              </Actions>
            {/if}
          {/snippet}
        </Async>
      {/if}
    {/if}
  {/snippet}
</Async>
