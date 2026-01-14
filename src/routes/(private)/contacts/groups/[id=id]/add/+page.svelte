<script lang="ts">
  import { Async, combined } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Favorites } from '@/favorites/ui'
  import { groups, add } from '@/groups'
  import Invite from './Invite.svelte'

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
</script>

<Async store={combined(groups, contacts, favorites)}>
  {#snippet awaited([groups, contacts, favorites])}
    {@const group = groups.find((g) => g.id === id)}
    {#if group}
      <Section>
        <Header.Root>
          <Back href={`/contacts/groups/${group.id}`}>{group.name}</Back>
        </Header.Root>
      </Section>
      <Section>
        <h1>{$dict.groups.members.addMembers}</h1>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      {@const availableFavs = favorites.filter((f) => !group.identities.includes(f.favorite))}
      {@const filteredFavs = filterFavorites(availableFavs, contacts, search)}
      {@const availableContacts = contacts.filter((c) => !group.identities.includes(c.identity))}
      {@const filteredContacts = filterContacts(availableContacts, search)}
      {@const hasResults = filteredFavs.length > 0 || filteredContacts.length > 0}

      <Favorites
        title={$dict.favorites.title}
        favorites={filteredFavs}
        bind:selection={favoritesSelection} />
      <Contacts
        contacts={filteredContacts}
        title={$dict.contacts.all}
        bind:selection={contactsSelection} />
      {#if search && !hasResults}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.actions.noResults}</p>
        </Section>
      {/if}

      <Section class="flex gap-2 w-full items-center justify-stretch">
        <Button
          class="flex-1"
          disabled={(contactsSelection.size === 0 && favoritesSelection.size === 0) || busy}
          onclick={addMembers}
          size="lg">
          {$dict.actions.addSelected}
        </Button>
        <Invite {id} />
      </Section>
    {/if}
  {/snippet}
</Async>
