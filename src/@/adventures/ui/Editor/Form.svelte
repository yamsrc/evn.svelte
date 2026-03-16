<script lang="ts">
  import { Check, UserRoundPlus } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { onsubmit as submitter } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Archive, Cover, Members } from '@/adventures/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Action, Section } from '@/app/ui'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { account as me } from '@/iam'
  import type { Props, Value } from './Form'

  let {
    id,
    value = $bindable<Value>(),
    busy = $bindable(false),
    onsubmit: callback,
  }: Props = $props()

  const identities = $derived(Object.keys(value.participants))

  const showMembers = $derived(
    $me?.id === undefined || identities.length !== 1 || identities[0] !== $me.id,
  )

  let submitButton = $state<HTMLButtonElement | null>(null)

  async function submit() {
    const title = value.title.trim()

    if (!title) return

    busy = true
    await callback?.({ ...value, title })
    busy = false
  }
</script>

<Section>
  <form class="space-y-5" onsubmit={submitter(submit)}>
    <Cosmetics.Root class="w-full">
      <Cosmetics.Content class="items-stretch gap-2 w-full">
        <Cosmetics.Name class="w-full" placeholder={$dict.editor.name} bind:value={value.title} />
        <Cosmetics.Note>{$dict.editor.note}</Cosmetics.Note>
      </Cosmetics.Content>
    </Cosmetics.Root>

    <Cover picture={value.picture} onchange={(picture) => (value.picture = picture)} />

    <div class="space-y-2">
      {#if showMembers}
        <Members {identities} participants={value.participants} />
      {/if}

      <Button
        id="adventures-editor-members-button"
        href="add/"
        disabled={busy || id === undefined}
        variant="secondary"
        size="lg"
        class="w-full">
        <UserRoundPlus />
        <span>{$dict.members.add}</span>
      </Button>
    </div>

    {#if id !== undefined}
      <Archive {id} {value} />
    {/if}

    <button bind:this={submitButton} type="submit" class="sr-only">
      {$common.actions.save}
    </button>
  </form>
</Section>

<Actions>
  <Action
    id="adventures-editor-save-button"
    disabled={busy || !value.title.trim()}
    onclick={() => submitButton?.click()}>
    <Check />
    <span>{$common.actions.save}</span>
  </Action>
</Actions>
