<script lang="ts">
  import { Async } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { buttonVariants, Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { CreateDialog } from '@/contacts/ui'
  import { draft } from '@/expenses/ui'
  import type { Participant } from '@/expenses'

  const id = $derived(page.params.id as string)

  // svelte-ignore non_reactive_update
  let selection = new SvelteSet<string>()

  async function addParticipants() {
    if (!$draft) return

    const participants = Object.fromEntries(
      Array.from(selection).map((identity) => [identity, { amount: 0 } as Participant]),
    )

    draft.update((d) => {
      if (!d) return d

      return {
        ...d,
        value: {
          ...d.value,
          participants: {
            ...d.value.participants,
            ...participants,
          },
        },
      }
    })

    await goto(`/expenses/${id}/`)
  }
</script>

<Section>
  <Header.Root>
    <Back href={`/expenses/${id}/`}>{$draft?.value.title || $dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const list = contacts.filter((c) => !(c.identity in ($draft?.value.participants ?? {})))}
    <Contacts title={$dict.expenses.participants.title} contacts={list} bind:selection />
  {/snippet}
</Async>

<Section class="flex items-center justify-evenly gap-2">
  <Button size="lg" class="flex-1" onclick={addParticipants}>
    {$dict.actions.addSelected}
  </Button>
  <CreateDialog class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })} />
</Section>
