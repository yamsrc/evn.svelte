<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { pickpic } from '@/accounts'
  import { Cosmetics, type Value } from '@/app/ui'
  import { add } from '@/contacts'

  async function onchange(value: Value) {
    const contact = await add({
      name: value.name,
      picture: value.picture ?? pickpic(),
    })

    if (contact instanceof Error) return

    await goto(`/contacts/${contact.id}/`)
  }
</script>

<Cosmetics label={$dict.contacts.add.label} picture={true} {onchange} />
