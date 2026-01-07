<script lang="ts">
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { owe } from '@/expenses'
  import { account } from '@/iam'
  import Balance from './Balance.svelte'
  import Description from './Description.svelte'
  import Payers from './Payers.svelte'
  import Spendings from './Spendings.svelte'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), onsubmit: onSubmit }: Props = $props()

  async function submit() {
    const result = await onSubmit?.(value)

    if (result instanceof Error) {
      // Error handling
    }
  }
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={value.title} bind:location={value.location} />

  <Separator />

  <Spendings bind:participants={value.participants} bind:extras={value.extras} />

  <Separator />

  <Payers bind:participants={value.participants} extras={value.extras} />

  <Section class="flex flex-col gap-2">
    <Button type="submit" size="lg" class="w-full">{$dict.expenses.form.save}</Button>
    <Balance
      class="flex-row gap-2 justify-center"
      balance={owe(value.participants, $account?.id)}
      youOwe={$dict.expenses.balance.youWillOwe}
      youAreOwed={$dict.expenses.balance.youWillBeOwed}
    />
  </Section>
</form>
