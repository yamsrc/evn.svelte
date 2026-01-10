<script lang="ts">
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Balance } from '@/app/ui'
  import { owe } from '@/expenses'
  import { account } from '@/iam'
  import { sumup, setContext } from './Context'
  import Description from './Description.svelte'
  import Participants from './Participants.svelte'
  import Payers from './Payers.svelte'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), onsubmit: callback }: Props = $props()
  let busy = $state(false)

  const balance = $derived(owe(value.participants, value.extras, $account?.id))

  async function submit() {
    busy = true

    await callback?.(value)

    busy = false
  }

  const payers = $derived(
    Object.values(value.participants).filter((p) => p.paid !== undefined).length,
  )

  const split = $derived(payers > 1)
  const total = $derived(sumup(value))

  setContext({
    get payers() {
      return payers
    },
    get split() {
      return split
    },
    get total() {
      return total
    },
  })
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={value.title} bind:location={value.location} />

  <Separator />

  <Participants bind:value />

  <Separator />

  <Payers bind:value />

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
