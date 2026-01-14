<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts, filter as filterContacts } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { favorites } from '@/favorites'
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
    </Header.Actions>
  </Header.Root>
</Section>

<Async store={combined(contacts, favorites)}>
  {#snippet awaited([contacts, favorites])}
    {@const filteredGroups = filterGroups($groups, search)}
    {@const filteredContacts = filterContacts(contacts, search)}
    {@const hasSearchableResults = filteredGroups.length > 0 || filteredContacts.length > 0}

    {#if $groups.length || contacts.length || favorites.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      {#if favorites.length}
        <Favorites title={$dict.favorites.title} {favorites} />
      {/if}

      {#if $groups.length}
        <Groups title={$dict.groups.title} groups={$groups} {search} />
      {/if}

      {#if contacts.length}
        <Contacts title={$dict.contacts.all} {contacts} {search} actionable />
      {/if}

      {#if search && !hasSearchableResults}
        <Section>
          <p class="text-muted-foreground text-center">{$dict.actions.noResults}</p>
        </Section>
      {/if}
    {:else if $account}
      <Section class="m-auto flex flex-col items-center justify-center gap-2">
        <h2>{$dict.contacts.empty.title}</h2>
        <p>{$dict.contacts.empty.description}</p>
        <Invite id={$account.id} />
      </Section>
    {/if}
  {/snippet}
</Async>
