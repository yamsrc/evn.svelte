<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { groups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { account } from '@/iam'

  let search = $state('')
</script>

<Section>
  <Header.Root title={$dict.contacts.title}>
    {#snippet actions()}
      <Header.Button disabled>
        <ArrowUpDown />
      </Header.Button>
    {/snippet}
  </Header.Root>
</Section>

<Section>
  <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
</Section>

{#if $groups.length > 0}
  <Groups title={$dict.groups.title} groups={$groups} {search} />
{/if}

<Async store={contacts} class="flex-1 flex flex-col">
  {#snippet awaited(contacts)}
    {#if contacts.length === 0 && $account}
      <Invite id={$account.id} />
    {:else}
      <Contacts title={$dict.contacts.all} {contacts} {search} actionable />
    {/if}
  {/snippet}
</Async>
