<script lang="ts">
  import { Plus, Settings } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { adventures } from '@/adventures'
  import { Expenses, Members, Totals } from '@/adventures/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { account } from '@/iam'
  import { Picture } from '@/media/ui'

  const id = $derived(page.params.id) as string
</script>

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((adventure) => adventure.id === id)}

    {#if adventure}
      {@const identities = Object.keys(adventure.participants)}
      {@const balance = adventure.participants[$account?.id ?? ''] ?? 0}
      {@const total = adventure.expenses.reduce((sum, expense) => sum + expense.amount, 0) ?? 0}

      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
          {#if !adventure.archived}
            <Header.Actions>
              <Header.Button
                id="adventures-view-settings-button"
                href={`/adventures/editor/${adventure.id}/`}>
                <Settings />
              </Header.Button>
            </Header.Actions>
          {/if}
        </Header.Root>
      </Section>

      <Section>
        <Picture
          id={adventure.picture}
          variant="600x400!"
          class="w-full h-48 object-cover rounded-xl" />
      </Section>

      <Section>
        <Totals {balance} {total} />
      </Section>

      <Section>
        <Members {identities} participants={adventure.participants} />
      </Section>

      <Section>
        <Expenses adventure={adventure.id} expenses={adventure.expenses} title={adventure.title} />
      </Section>

      {#if !adventure.archived}
        <Actions>
          <Action
            id="adventures-view-create-action"
            href={`/adventures/${adventure.id}/expenses/editor/`}>
            <Plus />
            <span>{$common.actions.create}</span>
          </Action>
        </Actions>
      {/if}
    {/if}
  {/snippet}
</Async>
