<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { ok } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { contacts as contactsStore } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { groups as groupsStore } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { account } from '@/iam'
  import type { GroupWithBalance } from '@/groups/ui'

  const contacts = $derived(ok($contactsStore) ? $contactsStore : [])
  const rawGroups = $derived(ok($groupsStore) ? $groupsStore : [])

  const groups: GroupWithBalance[] = $derived.by(() => {
    return rawGroups.map((group) => ({
      ...group,
      balance: group.identities
        .map((id) => contacts.find(({ identity }) => identity === id)?.balance ?? 0)
        .reduce((acc, balance) => acc + balance, 0),
    }))
  })
</script>

<Section class="flex flex-col gap-6 pt-2">
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

{#if groups.length > 0}
  <Groups title={$dict.groups.title} {groups} />
{/if}

<div class="flex-1 flex flex-col">
  {#if contacts.length === 0 && $account}
    <Invite id={$account.id} />
  {:else}
    <Contacts title={$dict.contacts.all} {contacts} actionable />
  {/if}
</div>
