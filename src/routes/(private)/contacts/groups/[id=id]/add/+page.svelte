<script lang="ts">
  import { Share2 } from '@lucide/svelte'
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import Section from '$com/section/Section.svelte'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { groups, add } from '@/groups'

  const id = page.params.id as string
  let selection = $state<string[]>([])
  let busy = $state(false)

  async function addMembers() {
    busy = true

    const res = await add(id, selection)

    busy = false

    if (res instanceof Error) return

    goto(`/contacts/groups/${id}`)
  }
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const group = groups.find((g) => g.id === id)}
    {#if group}
      <Section>
        <header>
          <Back href={`/contacts/groups/${group.id}`}>{group.name}</Back>
        </header>
      </Section>
      <Section>
        <!-- TODO: add search -->
        <h1>{$dict.groups.members.addMembers}</h1>
      </Section>
      <!-- TODO: add favorites -->

      {@const list = $contacts.filter((c) => !group.identities.includes(c.identity))}
      <Contacts contacts={list} title={$dict.contacts.all} selectable bind:selection />
      <Section class="flex gap-2 w-full items-center justify-stretch">
        <Button class="flex-1" disabled={selection.length === 0 || busy} onclick={addMembers}
          >{$dict.actions.addSelected}</Button
        >
        <!-- TODO: implement invite dropdown -->
        <Button class="flex-1" variant="secondary">
          <Share2 size={16} />
          {$dict.actions.invite}
        </Button>
      </Section>
    {/if}
  {/snippet}
</Async>
