<script lang="ts">
  import { Check, UserRoundPlus } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { onsubmit as submitter } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Cover, Members } from '@/adventures/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Action, Section } from '@/app/ui'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { account as me } from '@/iam'
  import type { Props, Value } from './Form'

  let { value = $bindable<Value>(), busy = $bindable(false), onsubmit: callback }: Props = $props()

  const showMembers = $derived(
    $me?.id === undefined || value.participants.length > 1 || value.participants[0] !== $me.id,
  )

  const participants = $derived(Object.fromEntries(value.participants.map((id) => [id, 0])))

  let submitButton = $state<HTMLButtonElement | null>(null)

  async function submit() {
    if (!valid) return

    const title = value.title.trim()

    busy = true
    await callback?.({ ...value, title })
    busy = false
  }

  const valid = $derived(value.title.trim() && value.picture !== '')
</script>

<Section>
  <form class="space-y-5" onsubmit={submitter(submit)}>
    <Cosmetics.Root class="w-full">
      <Cosmetics.Content class="items-stretch gap-2 w-full">
        <Cosmetics.Name class="w-full" placeholder={$dict.editor.name} bind:value={value.title} />
        <Cosmetics.Note>{$dict.editor.note}</Cosmetics.Note>
      </Cosmetics.Content>
    </Cosmetics.Root>

    <Cover bind:picture={value.picture} />

    <div class="space-y-2">
      {#if showMembers}
        <Members {participants} />
      {/if}

      <Button
        id="adventures-editor-members-button"
        href="add/"
        disabled={busy}
        variant="secondary"
        size="lg"
        class="w-full">
        <UserRoundPlus />
        <span>{$dict.members.add}</span>
      </Button>
    </div>

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
