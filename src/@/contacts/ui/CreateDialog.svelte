<script lang="ts">
  import { UserPen } from '@lucide/svelte'
  import { add } from '@/contacts'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { pickpic } from '@/accounts'
  import { buttonVariants } from '$ui/button'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl'
  import * as Dialog from '$com/ui/dialog'
  import type { Props } from './CreateDialog'

  const { oncreate, class: classes }: Props = $props()

  let name = $state<string>('')
  let picture = $state<string>(pickpic())

  let open = $state(false)
  let busy = $state(false)

  async function submit() {
    if (!name.trim()) return

    busy = true

    const contact = await add({
      name,
      picture,
    })

    busy = false

    if (contact instanceof Error) return

    oncreate?.(contact)

    open = false
    name = ''
    picture = pickpic()
  }

  function onPictureChange(id: string) {
    picture = id
    submit()
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger id="expenses-add-participants-create-button" class={classes}>
    <UserPen />
    <span>{$dict.actions.create}</span>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>
        <h2>{$dict.expenses.participants.create.title}</h2>
      </Dialog.Title>
    </Dialog.Header>
    <Cosmetics.Root>
      <Cosmetics.Picture bind:id={picture} onchange={onPictureChange} class="mx-auto" />
      <Cosmetics.Name bind:value={name} bind:busy onchange={submit} />
      <Dialog.Footer>
        <Cosmetics.Actions class="w-full flex gap-2">
          <Dialog.Close
            class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })}
            disabled={busy}>
            {$dict.actions.cancel}
          </Dialog.Close>
          <Button
            id="app-cosmetics-submit-button"
            size="lg"
            class="flex-1"
            disabled={busy || !name.trim()}
            onclick={submit}>
            {$dict.actions.save}
          </Button>
        </Cosmetics.Actions>
      </Dialog.Footer>
    </Cosmetics.Root>
  </Dialog.Content>
</Dialog.Root>
