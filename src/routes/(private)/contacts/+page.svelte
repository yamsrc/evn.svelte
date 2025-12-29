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
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
    <Header.Actions>
      <Header.Button disabled>
        <ArrowUpDown />
      </Header.Button>
    </Header.Actions>
  </Header.Root>
</Section>

<Async store={contacts} class="flex-1 flex flex-col space-y-5">
  {#snippet awaited(contacts)}
    {#if $groups.length || contacts.length}
      <Section>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>

      {#if $groups.length}
        <Groups title={$dict.groups.title} groups={$groups} {search} />
      {/if}

      {#if contacts.length}
        <Contacts title={$dict.contacts.all} {contacts} {search} actionable />
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
