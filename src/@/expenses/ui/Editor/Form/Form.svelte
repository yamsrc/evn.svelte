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
  import { normalize, type Props, type Value } from './Form'
  import { autoeffects } from './Form'
  import Participants from './Participants.svelte'
  import PayerSelect from './PayerSelect.svelte'
  import Total from './Total.svelte'

  let { value = $bindable<Value>(), onsubmit: callback }: Props = $props()
  let busy = $state(false)
  let error = $state(false)

  async function submit() {
    if (total !== numbers.total(value)) {
      console.log('total mismatch', total, numbers.total(value))
      error = true

      setTimeout(() => {
        error = false
      }, 600)

      return
    }

    busy = true

    const normalized = normalize(value)

    await callback?.(normalized)

    busy = false
  }

  const payers = $derived(
    Object.keys(value.participants).filter((id) => value.participants[id].paid !== undefined),
  )

  let total = $state(numbers.total(value))
  const split = $derived(payers.length > 1)
  const paid = $derived(numbers.paid(value))
  const overpaid = $derived(numbers.overpaid(value))

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
    get overpaid() {
      return overpaid
    },
  })

  const balance = $derived(numbers.balance(value))
  const enough = $derived(paid > 0 && (payers.length === 1 || paid >= total))

  $effect(() => autoeffects(value, payers, total))
</script>

<form onsubmit={onsubmit(submit)} class="space-y-5">
  <Description bind:title={value.title} bind:location={value.location} />

  <Separator />

  <Total bind:value bind:total />

  <Participants bind:value bind:error />

  <PayerSelect bind:value />

  <Section class="flex flex-col items-center gap-2">
    <Button
      id="expenses-form-save-button"
      type="submit"
      size="lg"
      class="w-full"
      disabled={busy || !enough}>
      {$dict.expenses.form.save}
    </Button>
    {#if balance !== 0}
      <Balance
        {balance}
        youOwe={$dict.expenses.balance.youWillOwe}
        youAreOwed={$dict.expenses.balance.youWillBeOwed} />
    {/if}
  </Section>
</form>
