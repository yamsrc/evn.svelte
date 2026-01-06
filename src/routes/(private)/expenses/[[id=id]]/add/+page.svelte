<script lang="ts">
  import { Async, ok } from 'svas'
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
  import { expenses, update } from '@/expenses'
  import { draft } from '@/expenses/ui'
  import type { Expense, net } from '@/expenses'

  const id = $derived(page.params.id)

  // svelte-ignore non_reactive_update
  let selection = new SvelteSet<string>()
  let busy = $state(false)

  const expense: Expense | undefined = $derived(
    id && ok($expenses) ? $expenses.find((e) => e.id === id) : undefined,
  )

  async function add() {
    busy = true

    const participants = Object.fromEntries(
      Array.from(selection).map((identity) => [identity, { amount: 0 }]),
    )

    if (!id || expense === undefined) {
      $draft.participants = {
        ...$draft.participants,
        ...participants,
      }

      goto('/expenses/new/')

      return
    }

    const data: net.Editable = {
      title: expense.title,
      location: expense.location,
      extras: expense.extras,
      participants: { ...expense.participants, ...participants },
    }

    const res = await update(id, data)

    if (res instanceof Error) {
      busy = false

      return
    }

    goto(`/expenses/${id}`)

    busy = false
  }
</script>

<Section>
  <Header.Root>
    {@const href = expense?.id ? `/expenses/${expense.id}/` : '/expenses/'}
    <Back {href}>{expense?.title ?? $dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const list = contacts.filter(
      (c) => !(c.identity in (expense?.participants ?? $draft.participants)),
    )}
    <Contacts title={$dict.expenses.participants.title} contacts={list} bind:selection />
  {/snippet}
</Async>

<Section class="flex items-center justify-evenly gap-2">
  <Button size="lg" class="flex-1" onclick={add} disabled={busy}>
    {$dict.actions.addSelected}
  </Button>
  <CreateDialog class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })} />
</Section>
