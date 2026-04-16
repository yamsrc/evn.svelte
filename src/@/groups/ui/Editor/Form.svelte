<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Cosmetics, Reduction } from '@/groups/ui'
  import { update } from '@/groups'
  import { CreateAction } from '@/expenses/ui'
  import { Action, Section } from '@/app/ui'
  import { onsubmit as submitter } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { Separator } from '$com/separator'
  import Participants from './Participants.svelte'
  import { getContext } from './Context'
  import Balance from './Balance.svelte'
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
    <Participants bind:identities={value.identities} bind:busy />
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
      value={{
        participants: Object.fromEntries(
          value.identities.map((id) => [
            id,
            { amount: 0, shares: 0, paid: $account?.id === id ? 0 : undefined },
          ]),
        ),
      }} />
  </Actions>
{/if}
