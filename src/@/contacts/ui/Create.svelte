<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { Cosmetics, type Value } from '@/app/ui'
  import { add } from '@/contacts'

  async function onchange(value: Value) {
    const contact = await add({
      name: value.name,
      picture: value.picture,
    })

    if (contact instanceof Error) return

    await goto(`/contacts/${contact.id}/`)
  }
</script>

<Cosmetics
  label={$dict.contacts.add.label}
  note={$dict.contacts.add.description}
  {onchange}
  autofocus
/>
