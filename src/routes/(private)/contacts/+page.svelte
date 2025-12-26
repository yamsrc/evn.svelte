<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { ok, ensure } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { accounts } from '@/account'
  import { contacts as contactsStore } from '@/contacts'
  import { Invite, type ContactWithAccount } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { groups as groupsStore } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { account } from '@/iam'
  import type { GroupWithBalance } from '@/groups/ui'

  let query = $state('')

  const contacts: ContactWithAccount[] = $derived.by(() => {
    if (!ok(contactsStore)) return []

    return $contactsStore.map((contact) => {
      const account = accounts.get(contact.identity)

      return {
        ...contact,
        account: ensure(account),
      }
    })
  })

  const rawGroups = $derived(ok($groupsStore) ? $groupsStore : [])

  const groups: GroupWithBalance[] = $derived.by(() => {
    return rawGroups.map((group) => ({
      ...group,
      balance: group.identities
        .map((id) => contacts.find(({ identity }) => identity === id)?.balance ?? 0)
        .reduce((acc, balance) => acc + balance, 0),
    }))
  })

  const filteredContacts: ContactWithAccount[] = $derived.by(() =>
    contacts.filter((contact) => contact.account.name?.toLowerCase().includes(query.toLowerCase())),
  )

  const filteredGroups: GroupWithBalance[] = $derived.by(() =>
    groups.filter((group) => group.name.toLowerCase().includes(query.toLowerCase())),
  )
</script>

<Section class="flex flex-col gap-6">
  <header class="flex justify-between items-center relative">
    <h1>{$dict.contacts.title}</h1>
    <Button
      size="icon"
      variant="secondary"
      class="size-12 bg-accent/50 border border-border"
      disabled
    >
      <ArrowUpDown class="size-5" />
    </Button>
  </header>
</Section>

<Section>
  <Input type="text" placeholder={$dict.actions.search} bind:value={query} />
</Section>

{#if groups.length > 0}
  <Groups title={$dict.groups.title} groups={filteredGroups} />
{/if}

<div class="flex-1 flex flex-col">
  {#if contacts.length === 0 && $account}
    <Invite id={$account.id} />
  {:else}
    <Contacts title={$dict.contacts.all} contacts={filteredContacts} actionable />
  {/if}
</div>
