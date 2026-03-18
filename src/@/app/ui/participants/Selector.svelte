<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Async, combined, ok } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { page } from '$app/state'
  import { Share } from '$com/buttons'
  import { back } from '$com/history'
  import { QR } from '$com/qr'
  import { Actions, Return } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Action, actionVariants, Header, Section } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Contacts, CreateDialog } from '@/contacts/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Favorites } from '@/favorites/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { identities as store } from './store'
  import type { Props } from './Selector'
  import type { Contact } from '@/contacts'
  import type { Favorite } from '@/favorites'
  import type { Group } from '@/groups'

  const { title, options: propsOptions }: Props = $props()
  const exclude = $derived(page.state.participants?.identities ?? [])
  const options = $derived(page.state.participants?.options ?? propsOptions ?? {})

  const invitation = $derived(
    options.shareUrl ? { url: `${window.location.origin}${options.shareUrl}` } : undefined,
  )

  let search = $state('')
  // svelte-ignore non_reactive_update
  let contactsSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let favoritesSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let groupSelection = new SvelteSet<string>()

  const notMember = (identity: string) => !exclude.includes(identity)

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

    store.set(identities)
    await back('..')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{title ?? $dict.participants.add.button}</Header.Title>
  </Header.Root>
</Section>

<Async store={combined(groups, contacts, favorites)}>
  {#snippet awaited([groups, contacts, favorites])}
    {@const filtered = view(groups, contacts, favorites)}
    <Section>
      <Input
        id="participants-selector-search-input"
        type="text"
        placeholder={$dict.actions.search}
        bind:value={search} />
    </Section>

    <Favorites
      title={$dict.favorites.title}
      favorites={filtered.favorites}
      bind:selection={favoritesSelection} />
    <Groups title={$dict.groups.title} groups={filtered.groups} bind:selection={groupSelection} />
    <Contacts
      title={$dict.contacts.title}
      contacts={filtered.contacts}
      bind:selection={contactsSelection} />

    {#if search && filtered.empty}
      <Section>
        <p class="text-center text-muted-foreground">{$dict.search.empty}</p>
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
  {#if options.managedContactsCreation}
    <CreateDialog
      class={actionVariants({
        variant: 'secondary',
        class: 'flex-1 [&_span]:hidden',
      })} />
  {/if}
  <Action id="participants-selector-add-button" disabled={!selected} onclick={addMembers}>
    <Check />
    <span>{$dict.actions.addSelected}</span>
  </Action>
</Actions>
