<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Async, combined, ok } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { page } from '$app/state'
  import { Share } from '$com/buttons'
  import { back } from '$com/history'
  import { QR } from '$com/qr'
  import { Actions, Return } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Spinner } from '$ui/spinner'
  import { add } from '@/adventures'
  import { Editor } from '@/adventures/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Action, Section, actionVariants } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Favorites } from '@/favorites/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import type { Contact } from '@/contacts'
  import type { Favorite } from '@/favorites'
  import type { Group } from '@/groups'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
  const invitation = $derived(
    id === undefined ? undefined : { url: `${window.location.origin}/join/adventure/${id}/` },
  )

  let search = $state('')
  // svelte-ignore non_reactive_update
  let contactsSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let favoritesSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let groupSelection = new SvelteSet<string>()
  let busy = $state(false)

  const notMember = (identity: string) => ctx.value.participants[identity] === undefined

  const selected = $derived(
    contactsSelection.size > 0 || favoritesSelection.size > 0 || groupSelection.size > 0,
  )

  function groupsById(groups: Group[]): Map<string, Group> {
    return new Map(groups.map((group) => [group.id, group] as const))
  }

  function members(id: string, map: Map<string, Group>): string[] {
    const group = map.get(id)

    return group ? group.identities : [id]
  }

  function picked(map: Map<string, Group>): string[] {
    return [
      ...contactsSelection,
      ...Array.from(favoritesSelection).flatMap((id) => members(id, map)),
      ...Array.from(groupSelection).flatMap((id) => members(id, map)),
    ]
  }

  function view(groups: Group[], contacts: Contact[], favorites: Favorite[]) {
    const map = groupsById(groups)

    const filteredGroups = filterGroups(
      groups.filter(({ identities }) => identities.some(notMember)),
      search,
    )

    const filteredFavorites = filterFavorites(
      favorites.filter(({ favorite }) => members(favorite, map).some(notMember)),
      contacts,
      groups,
      search,
    )

    const filteredContacts = filterContacts(
      contacts.filter(({ identity }) => notMember(identity)),
      search,
    )

    return {
      groups: filteredGroups,
      favorites: filteredFavorites,
      contacts: filteredContacts,
      empty:
        filteredGroups.length === 0 &&
        filteredFavorites.length === 0 &&
        filteredContacts.length === 0,
    }
  }

  async function addMembers() {
    const map = ok($groups) ? groupsById($groups) : new Map<string, Group>()
    const identities = Array.from(new Set(picked(map).filter(notMember)))

    if (identities.length === 0) return

    busy = true

    if (id === undefined) {
      ctx.value.participants = {
        ...ctx.value.participants,
        ...Object.fromEntries(identities.map((identity) => [identity, 0])),
      }

      busy = false
      await back('/adventures/editor/')

      return
    }

    const adventure = await add(id, identities)

    busy = false

    if (adventure instanceof Error) return

    ctx.value.participants = adventure.participants
    ctx.value.expenses = adventure.expenses

    await back(`/adventures/editor/${id}/`)
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{ctx.value.title || $dict.members.add}</Header.Title>
  </Header.Root>
</Section>

<Async store={combined(groups, contacts, favorites)}>
  {#snippet awaited([groups, contacts, favorites])}
    {@const filtered = view(groups, contacts, favorites)}
    <Section>
      <Input
        id="adventures-editor-search-input"
        type="text"
        placeholder={$common.actions.search}
        bind:value={search} />
    </Section>

    <Favorites
      title={$common.favorites.title}
      favorites={filtered.favorites}
      bind:selection={favoritesSelection} />
    <Groups title={$common.groups.title} groups={filtered.groups} bind:selection={groupSelection} />
    <Contacts
      title={$dict.members.title}
      contacts={filtered.contacts}
      bind:selection={contactsSelection} />

    {#if search && filtered.empty}
      <Section>
        <p class="text-center text-muted-foreground">{$common.search.empty}</p>
      </Section>
    {/if}
  {/snippet}
</Async>

<Return />

<Actions>
  {#if invitation}
    <Share class={actionVariants({ variant: 'secondary', class: 'flex-1' })} data={invitation} />
    <QR class={actionVariants({ variant: 'secondary', class: 'flex-1' })} text={invitation.url} />
  {/if}
  <Action id="adventures-editor-add-button" disabled={busy || !selected} onclick={addMembers}>
    {#if busy}
      <Spinner />
    {:else}
      <Check />
    {/if}
    <span>{$common.actions.addSelected}</span>
  </Action>
</Actions>
