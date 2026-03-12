<script lang="ts">
  import { account } from '@/iam'
  import { add } from '@/contacts'
  import { Cosmetics, type Value } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { goto } from '$app/navigation'

  async function onchange(value: Value) {
    const contact = await add({
      name: value.name,
      picture: value.picture,
    })

    if (contact instanceof Error) return

    const identity = contact.identities.find((id) => id !== $account?.id)

    if (identity) await goto(`/contacts/${identity}/`)
  }
</script>

<Cosmetics
  label={$dict.contacts.add.label}
  note={$dict.contacts.add.description}
  {onchange}
  autofocus />
