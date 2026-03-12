<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import { Async, combined } from 'svas'
  import { Check } from '@lucide/svelte'
  import { Groups } from '@/groups/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Editor } from '@/expenses/ui'
  import { numbers, type Participant } from '@/expenses'
  import { Contacts } from '@/contacts/ui'
  import { CreateDialog } from '@/contacts/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Action, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { actionVariants } from '@/app/ui'
  import { Input } from '$ui/input'
  import { dict } from '$lib/intl'
  import { Actions, Return } from '$com/shell'
  import { back } from '$com/history'

  const ctx = Editor.getContext()

  let search = $state('')
  // svelte-ignore non_reactive_update
  let contactsSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let groupSelection = new SvelteSet<string>()

  const notParticipant = (identity: string) => !(identity in ctx.value.participants)

  async function addParticipants() {
    const contactIds = Array.from(contactsSelection)

    const groupIds = Array.from(groupSelection).flatMap(
      (id) => $groups.find((g) => g.id === id)?.identities ?? [],
    )

    const existingParticipantIds = Object.keys(ctx.value.participants)

    const even =
      existingParticipantIds.length > 0 &&
      numbers.even(ctx.value.participants, existingParticipantIds)

    const total = numbers.total(ctx.value)

    const participants: Record<string, Participant> = Object.fromEntries(
      [...contactIds, ...groupIds]
        .filter(notParticipant)
        .map((identity) => [identity, { amount: 0, shares: 0 }]),
    )

    ctx.value.participants = {
      ...ctx.value.participants,
      ...participants,
    }

    if (even && total > 0) {
      const splitAmounts = numbers.split(total, Object.keys(ctx.value.participants))

      for (const [id, amount] of Object.entries(splitAmounts))
        ctx.value.participants[id].amount = amount
    }

    await back('..')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{ctx.value.title || $dict.expenses.title}</Header.Title>
  </Header.Root>
</Section>

<Async store={combined(groups, contacts)}>
  {#snippet awaited([groups, contacts])}
    <Section>
      <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
    </Section>

    {@const availableGroups = groups.filter(({ identities }) => identities.some(notParticipant))}
    {@const filteredGroups = filterGroups(availableGroups, search)}
    {@const availableContacts = contacts.filter(({ identity }) => notParticipant(identity))}
    {@const filteredContacts = filterContacts(availableContacts, search)}
    {@const empty = filteredGroups.length === 0 && filteredContacts.length === 0}

    <Groups title={$dict.groups.title} groups={filteredGroups} bind:selection={groupSelection} />
    <Contacts
      title={$dict.expenses.participants.title}
      contacts={filteredContacts}
      bind:selection={contactsSelection} />
    {#if search && empty}
      <Section>
        <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
      </Section>
    {/if}
  {/snippet}
</Async>

<Return />

<Actions>
  <CreateDialog
    class={actionVariants({
      variant: 'secondary',
      class: 'flex-1 [&_span]:hidden',
    })} />
  <Action
    id="expenses-add-participants-add-button"
    variant="default"
    disabled={contactsSelection.size === 0 && groupSelection.size === 0}
    onclick={addParticipants}>
    <Check />
    <span>{$dict.actions.addSelected}</span>
  </Action>
</Actions>
