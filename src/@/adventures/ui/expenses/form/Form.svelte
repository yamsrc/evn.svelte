<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { account as me } from '@/iam'
  import { PayerSelect } from '@/expenses/ui'
  import { Action, Section } from '@/app/ui'
  import { expenses } from '@/adventures'
  import { onsubmit } from '$lib/tools'
  import { dict as common } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { back } from '$com/history'
  import Total from './Total.svelte'
  import Description from './Description.svelte'
  import type { Expense } from '@/adventures'
  import type { Props } from './Form'

  const {
    adventure,
    expense,
    attachments = $bindable([...(expense.attachments ?? [])]),
  }: Props = $props()

  const participants = $derived(Object.keys(adventure.participants))

  function seed(e: Partial<Expense>, me?: string) {
    const participants = Object.keys(adventure.participants)

    return {
      title: e.title ?? '',
      location: e.location,
      attachments: [...(e.attachments ?? [])],
      amount: e.amount ?? 0,
      payer: e.payer ?? (me && participants.includes(me) ? me : undefined),
    }
  }

  const sorted = (v: unknown) => JSON.stringify(v, Object.keys(v as object).sort())

  // svelte-ignore state_referenced_locally
  const initial = seed(expense, $me?.id)
  const snapshot = sorted(initial)
  const { attachments: _seedAttachments, ...rest } = initial
  const form = $state(rest)

  let busy = $state(false)
  let submitButton = $state<HTMLButtonElement | null>(null)

  const payload = $derived(
    form.title.trim().length > 0 && form.amount > 0 && form.payer !== undefined
      ? {
          title: form.title,
          amount: form.amount,
          payer: form.payer,
          location: form.location,
          attachments,
        }
      : null,
  )

  const _draft = $derived({
    title: form.title,
    location: form.location,
    attachments,
  })

  export function draft() {
    return _draft
  }

  export function attach(...ids: string[]) {
    attachments.push(...ids)
  }

  async function submit() {
    if (!payload) return

    if (expense.id && sorted(payload) === snapshot) return back(`/adventures/${adventure.id}/`)

    busy = true

    const result = expense.id
      ? await expenses.update(adventure.id, expense.id, payload)
      : await expenses.create(adventure.id, payload)

    busy = false

    if (result instanceof Error) return

    await back(`/adventures/${adventure.id}/`)
  }
</script>

<Section>
  <form onsubmit={onsubmit(submit)} class="space-y-5">
    <Description bind:title={form.title} bind:location={form.location} />
    <Total bind:amount={form.amount} />
    <PayerSelect bind:value={form.payer} identities={participants} />

    <button bind:this={submitButton} type="submit" class="sr-only">
      {$common.expenses.form.save}
    </button>
  </form>
</Section>

<Actions>
  <Action
    id="adventures-expense-save-button"
    disabled={busy || !payload}
    onclick={() => submitButton?.click()}>
    <Check />
    <span>{$common.expenses.form.save}</span>
  </Action>
</Actions>
