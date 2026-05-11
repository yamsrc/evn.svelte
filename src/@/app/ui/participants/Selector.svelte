<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import { Async, combined, ok } from 'svas'
  import { Check } from '@lucide/svelte'
  import { Groups } from '@/groups/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Favorites } from '@/favorites/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Contacts, CreateDialog } from '@/contacts/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Action, actionVariants, Header, Section } from '@/app/ui'
  import { Input } from '$ui/input'
  import { dict } from '$lib/intl'
  import { Actions, Return } from '$com/shell'
  import { QR } from '$com/qr'
  import { back } from '$com/history'
  import { Share } from '$com/buttons'
  import { page } from '$app/state'
  import { identities } from './identities'
  import type { Group } from '@/groups'
  import type { Favorite } from '@/favorites'
  import type { Contact } from '@/contacts'
  import type { Props } from './Selector'

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
    const selected = Array.from(new Set(picked(map).filter(notMember)))

    if (selected.length === 0) return

    identities.push(...selected)
    await back('..')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{title || $dict.participants.add.button}</Header.Title>
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
  <CreateDialog
    class={actionVariants({
      variant: 'secondary',
      class: 'flex-1 [&_span]:hidden',
    })} />
  <Action id="participants-selector-add-button" disabled={!selected} onclick={addMembers}>
    <Check />
    <span>{$dict.actions.addSelected}</span>
  </Action>
</Actions>
