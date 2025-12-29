<script lang="ts">
  import { Async, combined } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { groups, add } from '@/groups'
  import Invite from './Invite.svelte'

  let search = $state('')

  const id = page.params.id as string
  // svelte-ignore non_reactive_update
  let selection = new SvelteSet<string>()
  let busy = $state(false)

  async function addMembers() {
    busy = true

    const res = await add(id, Array.from(selection))

    busy = false

    if (res instanceof Error) return

    goto(`/contacts/groups/${id}`)
  }
</script>

<Async store={combined(groups, contacts)} class="flex flex-col gap-5">
  {#snippet awaited([groups, contacts])}
    {@const group = groups.find((g) => g.id === id)}
    {#if group}
      <Section>
        <Header.Root>
          <Back href={`/contacts/groups/${group.id}`}>{group.name}</Back>
        </Header.Root>
      </Section>
      <Section>
        <h1>{$dict.groups.members.addMembers}</h1>
        <Input type="text" placeholder={$dict.actions.search} bind:value={search} />
      </Section>
      <!-- TODO: add favorites -->

      {@const list = contacts.filter((c) => !group.identities.includes(c.identity))}
      <Contacts contacts={list} title={$dict.contacts.all} bind:selection {search} />
      <Section class="flex gap-2 w-full items-center justify-stretch">
        <Button
          class="flex-1"
          disabled={selection.size === 0 || busy}
          onclick={addMembers}
          size="lg">{$dict.actions.addSelected}</Button
        >
        <Invite {id} />
      </Section>
    {/if}
  {/snippet}
</Async>
