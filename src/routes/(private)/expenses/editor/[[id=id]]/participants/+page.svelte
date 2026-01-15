<script lang="ts">
  import { Async, combined } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { back, Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { buttonVariants, Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { CreateDialog } from '@/contacts/ui'
  import { numbers, type Participant } from '@/expenses'
  import { Editor } from '@/expenses/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Groups } from '@/groups/ui'

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
        .map((identity) => [identity, { amount: 0 }]),
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
    <Back href="..">{ctx.value.title || $dict.expenses.title}</Back>
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

<Section class="sticky bottom-26 z-10 flex items-center justify-evenly gap-2">
  <Button
    id="expenses-add-participants-add-button"
    size="lg"
    class="flex-1"
    disabled={contactsSelection.size === 0 && groupSelection.size === 0}
    onclick={addParticipants}>
    {$dict.actions.addSelected}
  </Button>
  <CreateDialog class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })} />
</Section>
