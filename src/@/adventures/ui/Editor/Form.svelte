<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { onsubmit as submitter } from '$lib/tools'
  import { assign } from '@/adventures'
  import { Cover } from '@/adventures/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Action, Section } from '@/app/ui'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { getContext } from './Context'
  import Participants from './Participants.svelte'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), busy = $bindable(false), onsubmit: callback }: Props = $props()

  const ctx = getContext()

  let submitButton = $state<HTMLButtonElement | null>(null)

  const valid = $derived(value.title.trim() && value.picture !== '')

  function onname(title: string) {
    if (ctx.id) void assign(ctx.id, { title })
  }

  function onpicture(picture: string) {
    if (ctx.id) void assign(ctx.id, { picture })
  }

  async function submit() {
    if (!valid) return

    const title = value.title.trim()

    busy = true
    await callback?.({ ...value, title })
    busy = false
  }
</script>

<Section>
  <form class="space-y-5" onsubmit={submitter(submit)}>
    <Cosmetics.Root class="w-full">
      <Cosmetics.Content class="items-stretch gap-2 w-full">
        <Cosmetics.Name
          class="w-full"
          placeholder={$dict.editor.name}
          bind:value={value.title}
          onchange={onname} />
        <Cosmetics.Note>{$dict.editor.note}</Cosmetics.Note>
      </Cosmetics.Content>
    </Cosmetics.Root>

    <Cover bind:picture={value.picture} onchange={onpicture} />

    <Participants bind:value bind:busy />

    <button bind:this={submitButton} type="submit" class="sr-only">
      {$common.actions.save}
    </button>
  </form>
</Section>

<Actions>
  <Action
    id="adventures-editor-save-button"
    disabled={busy || !valid}
    onclick={() => submitButton?.click()}>
    <Check />
    <span>{$common.actions.save}</span>
  </Action>
</Actions>
