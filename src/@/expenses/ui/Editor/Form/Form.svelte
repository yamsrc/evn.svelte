<script lang="ts">
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Section } from '@/app/ui'
  import { Balance } from '@/app/ui'
  import { numbers } from '@/expenses'
  import { setContext } from './Context'
  import Description from './Description.svelte'
  import Participants from './Participants.svelte'
  import Payers from './Payers.svelte'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), onsubmit: callback }: Props = $props()
  let busy = $state(false)

  async function submit() {
    busy = true

    await callback?.(value)

    busy = false
  }

  const payers = $derived(
    Object.values(value.participants).filter((p) => p.paid !== undefined).length,
  )

  const split = $derived(payers > 1)
  const total = $derived(numbers.total(value))
  const paid = $derived(numbers.paid(value))

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
    get paid() {
      return paid
    },
  })

  const balance = $derived(numbers.balance(value))
  const enough = $derived(payers === 1 || paid >= total)
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={value.title} bind:location={value.location} />

  <Separator />

  <Participants bind:value />

  <Separator />

  <Payers bind:value />

  <Section class="flex flex-col items-center gap-2">
    <Button
      id="expenses-form-save-button"
      type="submit"
      size="lg"
      class="w-full"
      disabled={busy || !enough}
    >
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
