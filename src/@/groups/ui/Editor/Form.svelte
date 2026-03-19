<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Separator } from '$com/separator'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { onsubmit as submitter } from '$lib/tools'
  import { Action, actionVariants, Section } from '@/app/ui'
  import { Participants as ParticipantsUI } from '@/app/ui'
  import { CreateAction } from '@/expenses/ui'
  import { add, update } from '@/groups'
  import { Cosmetics, Reduction } from '@/groups/ui'
  import { account } from '@/iam'
  import Balance from './Balance.svelte'
  import { getContext } from './Context'
  import Participants from './Participants.svelte'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), busy = $bindable(false), onsubmit: callback }: Props = $props()
  let submitButton = $state<HTMLButtonElement | null>(null)

  const ctx = getContext()

  const valid = $derived(value.name.trim().length > 0)

  async function submit() {
    if (!valid) return

    busy = true
    await callback?.({ ...value, name: value.name.trim() })
    busy = false
  }

  function onname(name: string) {
    if (ctx.id) update(ctx.id, { name })
  }

  function onreduction(reduction: boolean) {
    if (ctx.id) update(ctx.id, { reduction })
  }

  async function onadd(identities: string[]) {
    if (ctx.id === undefined) {
      value.identities = [...value.identities, ...identities]

      return
    }

    busy = true

    const result = await add(ctx.id, identities)

    busy = false

    if (result instanceof Error) return

    value.identities = [...value.identities, ...identities]
  }
</script>

<form onsubmit={submitter(submit)} class="space-y-5">
  <Section>
    <Cosmetics bind:value onchange={onname} />
  </Section>

  <Separator />

  {#if ctx.id}
    <Section>
      <Balance {value} />
    </Section>
  {/if}

  <Section>
    <Participants identities={value.identities} />

    {#if ctx.id === undefined}
      <ParticipantsUI.Add
        id="groups-editor-members-button"
        exclude={value.identities}
        {onadd}
        disabled={busy}
        class="w-full" />
    {/if}
  </Section>

  <Section>
    <Reduction bind:enabled={value.reduction} onchange={onreduction} />
  </Section>

  {#if ctx.id === undefined}
    <button bind:this={submitButton} type="submit" class="sr-only">
      {$dict.actions.save}
    </button>
  {/if}
</form>

{#if ctx.id === undefined}
  <Actions>
    <Action
      id="nav-actions-groups-save-button"
      disabled={busy || !valid}
      onclick={() => submitButton?.click()}>
      <Check />
      <span>{$dict.actions.save}</span>
    </Action>
  </Actions>
{:else}
  <Actions>
    <CreateAction
      variant="secondary"
      value={{
        participants: Object.fromEntries(
          value.identities.map((id) => [
            id,
            { amount: 0, shares: 0, paid: $account?.id === id ? 0 : undefined },
          ]),
        ),
      }} />
    <ParticipantsUI.Add
      id="groups-editor-add-member-action"
      class={[actionVariants(), '[&_span]:sr-only']}
      exclude={value.identities}
      {onadd}
      disabled={busy} />
  </Actions>
{/if}
