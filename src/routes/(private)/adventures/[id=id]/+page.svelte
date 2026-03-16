<script lang="ts">
  import { Plus, Settings } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { adventures } from '@/adventures'
  import { Archived, Expenses, Members, Totals } from '@/adventures/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { account } from '@/iam'
  import { Picture } from '@/media/ui'
  import { seen } from '@/notifications'

  const id = $derived(page.params.id) as string

  $effect(() => {
    void seen('adventures', id)
  })
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

      {#if adventure.archived && adventure.archivedAt}
        <Section>
          <Archived at={adventure.archivedAt} />
        </Section>
      {/if}

      <Section>
        <Picture
          id={adventure.picture}
          variant="700x500!"
          class="w-full h-64 object-cover rounded-xl"
          style="view-transition-name: adventure-cover; view-transition-class: transition-morph;" />
      </Section>

      <Section>
        <Totals {balance} {total} />
      </Section>

      <Section>
        <Members {identities} participants={adventure.participants} />
      </Section>

      <Section>
        <Expenses {adventure} />
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
