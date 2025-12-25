<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { account } from '@/iam'
</script>

<Section class="flex flex-col gap-6 pt-2">
  <Header.Root title={$dict.contacts.title}>
    {#snippet actions()}
      <Header.Button disabled>
        <ArrowUpDown />
      </Header.Button>
    {/snippet}
  </Header.Root>
</Section>
<Async store={contacts} class="flex-1 flex flex-col">
  {#snippet awaited(contacts)}
    {#if contacts.length === 0 && $account}
      <Invite id={$account.id} />
    {:else}
      <Contacts title={$dict.contacts.all} {contacts} />
    {/if}
  {/snippet}
</Async>
