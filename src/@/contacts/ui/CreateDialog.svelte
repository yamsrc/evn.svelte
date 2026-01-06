<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import * as Dialog from '$com/ui/dialog'
  import { dict } from '$lib/intl'
  import { buttonVariants } from '$ui/button'
  import { Button } from '$ui/button'
  import { pickpic } from '@/accounts'
  import { Name, Picture } from '@/app/ui/cosmetics'
  import { add } from '@/contacts'
  import type { Props } from './CreateDialog'

  const { oncreate, class: classes }: Props = $props()

  let name = $state<string>('')
  let picture = $state<string>(pickpic())

  let open = $state(false)
  let busy = $state(false)

  async function submit() {
    console.log('submit', name, picture)

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
  <Dialog.Trigger class={classes}>
    <Plus />
    {$dict.actions.create}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>
        <h2>{$dict.expenses.participants.create.title}</h2>
      </Dialog.Title>
    </Dialog.Header>
    <div class="flex flex-col items-center gap-4">
      <Picture bind:id={picture} onchange={onPictureChange} />
      <Name bind:value={name} bind:busy onchange={submit} />
    </div>
    <Dialog.Footer class="flex-row">
      <Dialog.Close
        class={buttonVariants({ size: 'lg', variant: 'secondary', class: 'flex-1' })}
        disabled={busy}>{$dict.actions.cancel}</Dialog.Close
      >
      <Button size="lg" class="flex-1" disabled={busy || !name.trim()} onclick={submit}
        >{$dict.actions.save}</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
