<script lang="ts">
  import { Async } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { back, Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { buttonVariants, Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { CreateDialog } from '@/contacts/ui'
  import { Editor } from '@/expenses/ui'
  import { groups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import type { Participant } from '@/expenses'

  const ctx = Editor.getContext()

  let selection = new SvelteSet<string>()
  let groupSelection = new SvelteSet<string>()

  const notParticipant = (identity: string) => !(identity in ctx.value.participants)

  async function addParticipants() {
    const contactIds = Array.from(selection)

    const groupIds = Array.from(groupSelection).flatMap(
      (id) => $groups.find((g) => g.id === id)?.identities ?? [],
    )

    const participants: Record<string, Participant> = Object.fromEntries(
      [...contactIds, ...groupIds]
        .filter(notParticipant)
        .map((identity) => [identity, { amount: 0 }]),
    )

    ctx.value.participants = {
      ...ctx.value.participants,
      ...participants,
    }

    await back('..')
  }
</script>

<Section>
  <Header.Root>
    <Back href="..">{ctx.value.title || $dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const availableGroups = groups.filter(({ identities }) => identities.some(notParticipant))}
    {#if availableGroups.length > 0}
      <Groups title={$dict.groups.title} groups={availableGroups} bind:selection={groupSelection} />
    {/if}
  {/snippet}
</Async>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const list = contacts.filter(({ identity }) => notParticipant(identity))}
    <Contacts title={$dict.expenses.participants.title} contacts={list} bind:selection />
  {/snippet}
</Async>

<Section class="flex items-center justify-evenly gap-2">
  <Button
    id="expenses-add-participants-add-button"
    size="lg"
    class="flex-1"
    onclick={addParticipants}
  >
    {$dict.actions.addSelected}
  </Button>
  <CreateDialog class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })} />
</Section>
