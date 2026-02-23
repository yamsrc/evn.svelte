<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { ok } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Share } from '$com/buttons'
  import { QR } from '$com/qr'
  import { Actions, Return } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Spinner } from '$ui/spinner'
  import { Action, Section, actionVariants } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Favorites } from '@/favorites/ui'
  import { groups, add } from '@/groups'

  let search = $state('')

  const id = $derived(page.params.id as string)
  // svelte-ignore non_reactive_update
  let contactsSelection = new SvelteSet<string>()
  // svelte-ignore non_reactive_update
  let favoritesSelection = new SvelteSet<string>()
  let busy = $state(false)

  async function addMembers() {
    busy = true

    const identities = Array.from(new Set([...contactsSelection, ...favoritesSelection]))
    const res = await add(id, identities)

    busy = false

    if (res instanceof Error) return

    goto(`/contacts/groups/${id}`)
  }

  const invitation = $derived({ url: `${window.location.origin}/join/group/${id}/` })
</script>

<Async store={combined(groups, contacts, favorites)}>
  {#snippet awaited([groups, contacts, favorites])}
    {@const group = groups.find((g) => g.id === id)}
    {#if group}
      <Section>
        <Header.Root>
          <Header.Title>{group.name}</Header.Title>
        </Header.Root>
      </Section>
      <Section class="space-y-2">
        <h1>{$dict.groups.members.addMembers}</h1>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      {@const aliveContacts = contacts.filter((c) => ok(c.account) && !c.account.deleted)}
      {@const availableFavs = favorites.filter(
        ({ favorite }) => group.id !== favorite && !group.identities.includes(favorite),
      )}
      {@const filteredFavs = filterFavorites(availableFavs, aliveContacts, groups, search)}
      {@const availableContacts = aliveContacts.filter(
        (c) => !group.identities.includes(c.identity),
      )}
      {@const filteredContacts = filterContacts(availableContacts, search)}
      {@const empty = filteredFavs.length === 0 && filteredContacts.length === 0}

      <Favorites
        title={$dict.favorites.title}
        favorites={filteredFavs}
        bind:selection={favoritesSelection} />
      <Contacts
        contacts={filteredContacts}
        title={$dict.contacts.all}
        bind:selection={contactsSelection} />
      {#if search && empty}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
        </Section>
      {/if}
    {/if}
  {/snippet}
</Async>

<Return />

<Actions>
  <Share class={actionVariants({ variant: 'secondary', class: 'flex-1' })} data={invitation} />
  <QR class={actionVariants({ variant: 'secondary', class: 'flex-1' })} text={invitation.url} />
  <Action
    disabled={(contactsSelection.size === 0 && favoritesSelection.size === 0) || busy}
    onclick={addMembers}>
    {#if busy}
      <Spinner />
    {:else}
      <Check />
    {/if}
    <span>{$dict.actions.addSelected}</span>
  </Action>
</Actions>
