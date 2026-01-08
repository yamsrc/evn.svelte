<script lang="ts">
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Balance } from '@/app/ui'
  import { owe } from '@/expenses'
  import { account } from '@/iam'
  import Description from './Description.svelte'
  import Payers from './Payers.svelte'
  import Spendings from './Spendings.svelte'
  import type { Props, Value } from './Form'

  const { value = $bindable<Value>(), onsubmit: onSubmit }: Props = $props()
  const balance = $derived(owe(value.participants, value.extras, $account?.id))

  let busy = $state(false)

  async function submit() {
    busy = true

    await onSubmit?.(value)

    busy = false
  }
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={value.title} bind:location={value.location} />

  <Separator />

  <Spendings bind:participants={value.participants} bind:extras={value.extras} />

  <Separator />

  <Payers bind:participants={value.participants} extras={value.extras} />

  <Section class="flex flex-col items-center gap-2">
    <Button id="expenses-form-save-button" type="submit" size="lg" class="w-full" disabled={busy}>
      {$dict.expenses.form.save}
    </Button>
    {#if balance !== 0}
      <Balance
        {balance}
        youOwe={$dict.expenses.balance.youWillOwe}
        youAreOwed={$dict.expenses.balance.youWillBeOwed}
      />
    {/if}
  </Section>
</form>
