<script lang="ts">
  import { Async } from 'svas'
  import { getContext } from 'svelte'
  import { SvelteSet } from 'svelte/reactivity'
  import { back, Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { buttonVariants, Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { CreateDialog } from '@/contacts/ui'
  import type { Participant } from '@/expenses'
  import type { Context } from '@/expenses/ui/Editor/Context'

  const ctx = getContext<Context>('editor')

  let selection = new SvelteSet<string>()

  async function addParticipants() {
    const participants = Object.fromEntries(
      Array.from(selection).map((identity) => [identity, { amount: 0 } as Participant]),
    )

    ctx.value.participants = {
      ...ctx.value.participants,
      ...participants,
    }

    await back('..')
  }
</script>

<Section>
  <Header.Root>
    <Back href="..">{ctx.value.title || $dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const list = contacts.filter((c) => !(c.identity in ctx.value.participants))}
    <Contacts title={$dict.expenses.participants.title} contacts={list} bind:selection />
  {/snippet}
</Async>

<Section class="flex items-center justify-evenly gap-2">
  <Button
    id="expenses-add-participants-add-button"
    size="lg"
    class="flex-1"
    onclick={addParticipants}
  >
    {$dict.actions.addSelected}
  </Button>
  <CreateDialog class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })} />
</Section>
