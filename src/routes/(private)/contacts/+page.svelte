<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { contacts } from '@/contacts'
  import { Invite } from '@/contacts/ui'
  import { Contacts } from '@/contacts/ui'
  import { groups } from '@/groups'
  import { Groups } from '@/groups/ui'
  import { account } from '@/iam'

  let search = $state('')
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
  <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
</Section>

{#if $groups.length > 0}
  <Groups title={$dict.groups.title} groups={$groups} {search} />
{/if}

<div class="flex-1 flex flex-col">
  {#if $contacts.length === 0 && $account}
    <Invite id={$account.id} />
  {:else}
    <Contacts title={$dict.contacts.all} contacts={$contacts} {search} actionable />
  {/if}
</div>
