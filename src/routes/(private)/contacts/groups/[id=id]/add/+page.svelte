<script lang="ts">
  import { Async, ok, ensure } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import Section from '$com/section/Section.svelte'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { accounts } from '@/account'
  import { contacts as contactsStore } from '@/contacts'
  import { Contacts, type ContactWithAccount } from '@/contacts/ui'
  import { groups, add } from '@/groups'
  import Invite from './Invite.svelte'

  let query = $state('')

  const id = page.params.id as string
  // svelte-ignore non_reactive_update
  let selection = new SvelteSet<string>()
  let busy = $state(false)

  const contacts: ContactWithAccount[] = $derived.by(() => {
    if (!ok(contactsStore)) return []

    return $contactsStore.map((contact) => {
      const account = accounts.get(contact.identity)

      return { ...contact, account: ensure(account) }
    })
  })

  async function addMembers() {
    busy = true

    const res = await add(id, Array.from(selection))

    busy = false

    if (res instanceof Error) return

    goto(`/contacts/groups/${id}`)
  }

  const filteredContacts: ContactWithAccount[] = $derived.by(() =>
    contacts.filter((contact) => contact.account.name?.toLowerCase().includes(query.toLowerCase())),
  )
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const group = groups.find((g) => g.id === id)}
    {#if group}
      <Section>
        <header>
          <Back href={`/contacts/groups/${group.id}`}>{group.name}</Back>
        </header>
      </Section>
      <Section>
        <h1>{$dict.groups.members.addMembers}</h1>
        <Input type="text" placeholder={$dict.actions.search} bind:value={query} />
      </Section>
      <!-- TODO: add favorites -->

      {@const list = filteredContacts.filter((c) => !group.identities.includes(c.identity))}
      <Contacts contacts={list} title={$dict.contacts.all} bind:selection />
      <Section class="flex gap-2 w-full items-center justify-stretch">
        <Button
          class="flex-1"
          disabled={selection.size === 0 || busy}
          onclick={addMembers}
          size="lg">{$dict.actions.addSelected}</Button
        >
        <Invite {id} />
      </Section>
    {/if}
  {/snippet}
</Async>
