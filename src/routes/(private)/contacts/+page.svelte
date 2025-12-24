<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { contacts } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { account } from '@/iam'
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
<Async store={contacts} class="flex-1 flex flex-col">
  {#snippet awaited(contacts)}
    {#if contacts.length === 0 && $account}
      <Invite id={$account.id} />
    {:else}
      <Contacts title={$dict.contacts.all} {contacts} />
    {/if}
  {/snippet}
</Async>
