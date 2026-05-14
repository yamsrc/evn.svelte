<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Cosmetics, Cover, Reduction } from '@/groups/ui'
  import { update } from '@/groups'
  import { Action, Section } from '@/app/ui'
  import { onsubmit as submitter } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import Participants from './Participants.svelte'
  import { getContext } from './Context'
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
    if (ctx.id) void update(ctx.id, { name })
  }

  function onreduction(reduction: boolean) {
    if (ctx.id) void update(ctx.id, { reduction })
  }

  function onpicture(picture: string) {
    if (ctx.id) void update(ctx.id, { picture })
  }
</script>

<form onsubmit={submitter(submit)} class="space-y-5">
  <Section>
    <Cosmetics bind:value onchange={onname} />
  </Section>

  <Section>
    <Cover bind:picture={value.picture} onchange={onpicture} />
  </Section>

  <Section>
    <Participants bind:identities={value.identities} bind:busy />
  </Section>

  <Section>
    <Reduction bind:enabled={value.reduction} onchange={onreduction} />
  </Section>

  <button bind:this={submitButton} type="submit" class="sr-only">
    {$dict.actions.save}
  </button>
</form>

<Actions>
  <Action
    id="nav-actions-groups-save-button"
    disabled={busy || !valid}
    onclick={() => submitButton?.click()}>
    <Check />
    <span>{$dict.actions.save}</span>
  </Action>
</Actions>
