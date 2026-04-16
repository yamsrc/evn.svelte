<script lang="ts">
  import { Async, combined } from 'svas'
  import { scope } from '@/notifications'
  import { account } from '@/iam'
  import { Groups } from '@/groups/ui'
  import { groups, filter as filterGroups } from '@/groups'
  import { Favorites } from '@/favorites/ui'
  import { favorites, filter as filterFavorites } from '@/favorites'
  import { Actions, Invite, Contacts } from '@/contacts/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Avatar } from '@/accounts/ui'
  import { Input } from '$ui/input'
  import { dict } from '$lib/intl'

  let search = $state('')

  const groupsNotifications = scope({ domain: 'groups' })
  const contactsNotifications = scope({ domain: 'contacts' })
</script>

<Async store={combined(contacts, favorites, groups, account)}>
  {#snippet awaited([contacts, favorites, groupsList, account])}
    {@const filteredGroups = filterGroups(groupsList, search)}
    {@const filteredContacts = filterContacts(contacts, search)}
    {@const filteredFavorites = filterFavorites(favorites, contacts, groupsList, search)}
    {@const empty =
      filteredGroups.length === 0 &&
      filteredContacts.length === 0 &&
      filteredFavorites.length === 0}

    <Section>
      <Header.Root>
        <Header.Title>{$dict.contacts.title}</Header.Title>
        <Header.Actions>
          <Header.Button href="/me/" id="header-me-button" variant="ghost">
            <Avatar
              {account}
              style="view-transition-name: my-avatar; view-transition-class: transition-morph;" />
          </Header.Button>
        </Header.Actions>
      </Header.Root>
    </Section>

    {#if groupsList.length || contacts.length || favorites.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      <Favorites title={$dict.favorites.title} favorites={filteredFavorites} />

      <Groups
        title={$dict.groups.title}
        groups={filteredGroups}
        notifications={$groupsNotifications} />

      <Contacts
        title={$dict.contacts.all}
        contacts={filteredContacts}
        notifications={$contactsNotifications} />

      {#if search && empty}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.search.empty}</p>
        </Section>
      {/if}
    {:else}
      <Section class="m-auto flex flex-col items-center justify-center gap-2">
        <h2>{$dict.contacts.empty.title}</h2>
        <p>{$dict.contacts.empty.description}</p>
        <Invite id={account.id} />
      </Section>
    {/if}
  {/snippet}
</Async>

<Actions />
