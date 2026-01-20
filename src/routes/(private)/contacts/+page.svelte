<script lang="ts">
  import { ArrowUpDown, User } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Actions, Invite, Contacts } from '@/contacts/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Favorites } from '@/favorites/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { account } from '@/iam'

  let search = $state('')
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
    <Header.Actions>
      <Header.Button disabled>
        <ArrowUpDown />
      </Header.Button>
      <Header.Button href="/me/" id="header-me-button">
        <User class="size-5" />
      </Header.Button>
    </Header.Actions>
  </Header.Root>
</Section>

<Async store={combined(contacts, favorites)}>
  {#snippet awaited([contacts, favorites])}
    {@const filteredGroups = filterGroups($groups, search)}
    {@const filteredContacts = filterContacts(contacts, search)}
    {@const filteredFavorites = filterFavorites(favorites, contacts, search)}
    {@const empty =
      filteredGroups.length === 0 &&
      filteredContacts.length === 0 &&
      filteredFavorites.length === 0}

    {#if $groups.length || contacts.length || favorites.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      <Favorites title={$dict.favorites.title} favorites={filteredFavorites} />
      <Groups title={$dict.groups.title} groups={filteredGroups} />
      <Contacts title={$dict.contacts.all} contacts={filteredContacts} actionable />

      {#if search && empty}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
        </Section>
      {/if}
      <Actions />
    {:else if $account}
      <Section class="m-auto flex flex-col items-center justify-center gap-2">
        <h2>{$dict.contacts.empty.title}</h2>
        <p>{$dict.contacts.empty.description}</p>
        <Invite id={$account.id} />
      </Section>
    {/if}
  {/snippet}
</Async>
