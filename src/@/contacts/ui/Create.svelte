<script lang="ts">
  import { account } from '@/iam'
  import { add } from '@/contacts'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { pickpic } from '@/accounts'
  import { dict } from '$lib/intl'
  import { goto } from '$app/navigation'

  let name = $state('')
  let picture = $state(pickpic())
  let busy = $state(false)

  async function submit() {
    if (busy || name.trim() === '') return

    busy = true

    const contact = await add({ name, picture })

    busy = false

    if (contact instanceof Error) return

    const identity = contact.identities.find((id) => id !== $account?.id)

    if (identity) await goto(`/contacts/${identity}/`)
  }
</script>

<Cosmetics.Root>
  <Cosmetics.Content>
    <Cosmetics.Picture bind:id={picture} />
    <div class="space-y-2 w-full">
      <Cosmetics.Name bind:value={name} bind:busy onchange={submit} autofocus class="w-full" />
      <Cosmetics.Note>{$dict.contacts.add.description}</Cosmetics.Note>
    </div>
  </Cosmetics.Content>
  <Cosmetics.Actions label={$dict.contacts.add.label} {busy} onclick={submit} />
</Cosmetics.Root>
