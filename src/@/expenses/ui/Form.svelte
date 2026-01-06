<script lang="ts">
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { add, update } from '@/expenses'
  import Description from './Description.svelte'
  import Payers from './Payers.svelte'
  import Spendings from './Spendings.svelte'
  import type { Props } from './Form'
  import type { net } from '@/expenses'
  import type { Expense } from '@/expenses'

  let { expense = $bindable<Expense | net.Editable>(), onsend }: Props = $props()

  async function submit() {
    const data: net.Editable = {
      title: expense.title,
      location: expense.location,
      participants: expense.participants,
      extras: expense.extras,
    }

    const result = 'id' in expense ? await update(expense.id, data) : await add(data)

    if (result instanceof Error) return

    onsend?.(result)
  }
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={expense.title} bind:location={expense.location} />

  <Separator />

  <Spendings bind:participants={expense.participants} bind:extras={expense.extras} />

  <Separator />

  <Payers bind:participants={expense.participants} extras={expense.extras} />

  <Section>
    <Button type="submit" size="lg" class="w-full">{$dict.expenses.form.save}</Button>
  </Section>
</form>
