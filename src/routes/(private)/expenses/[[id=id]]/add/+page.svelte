<script lang="ts">
  import { Async, ok } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Contacts } from '@/contacts/ui'
  import { expenses, update } from '@/expenses'
  import { draft } from '@/expenses/ui'
  import type { Expense } from '@/expenses'

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

    const data = {
      ...expense,
      participants: { ...expense.participants, ...participants },
    }

    const res = await update(id, data)

    if (res instanceof Error) return

    busy = false

    goto(`/expenses/${id}`)
  }
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">Evns</Back>
  </Header.Root>
</Section>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const list = contacts.filter(
      (c) => !(c.identity in (expense?.participants ?? $draft.participants)),
    )}
    <Contacts title={$dict.contacts.all} contacts={list} bind:selection />
  {/snippet}
</Async>

<Section class="flex items-center gap-2">
  <Button size="lg" class="flex-1" onclick={add} disabled={busy}>
    {$dict.actions.addSelected}
  </Button>
  <Button size="lg" variant="secondary" class="flex-1" href="/contacts/new/" disabled={busy}>
    + Create
  </Button>
</Section>
