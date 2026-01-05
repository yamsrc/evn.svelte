<script lang="ts">
  import { Separator } from '$com/separator'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { Section } from '@/app/ui'
  import { add, update } from '@/expenses'
  import Payers from './Payers.svelte'
  import Spendings from './Spendings.svelte'
  import type { Props } from './Form'
  import type { net } from '@/expenses'
  import type { Expense } from '@/expenses'

  let { expense = $bindable<Expense | net.Editable>(), onsend }: Props = $props()

  let participants = $state.raw(expense.participants)

  async function submit() {
    const data: net.Editable = {
      title: expense.title,
      location: expense.location,
      participants: expense.participants,
      extras: expense.extras,
    }

    const result = 'id' in expense ? await update(expense.id, data) : await add(data)

    if (result instanceof Error) {
      console.error('Failed to add expense:', result)

      return
    }

    onsend?.(result)
  }

  $effect(() => {
    expense.participants = participants
    console.table(expense.participants)
  })
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Section class="space-y-5">
    <fieldset class="space-y-2">
      <Input
        bind:value={expense.title}
        name="title"
        required
        placeholder="What have spent on?"
        class="text-3xl font-bold"
      />
      <Input bind:value={expense.location} name="location" placeholder="WhereWhere? (Optional)" />
    </fieldset>
  </Section>

  <Separator />

  <Spendings bind:participants />

  <Separator />

  <Section class="space-y-5">
    <h2>Paid by</h2>
    <Payers bind:participants />
  </Section>

  <Section class="space-y-5">
    <Button type="submit" size="lg" class="w-full">Save and update balances</Button>
  </Section>
</form>
