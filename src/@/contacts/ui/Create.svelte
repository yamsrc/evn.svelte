<script lang="ts">
  import { goto } from '$app/navigation'
  import { Cosmetics, type Value } from '@/app/ui'
  import { add } from '@/contacts'

  async function onchange(value: Value) {
    const contact = await add({ name: value.name, picture: value.picture })

    if (contact instanceof Error) return

    await goto(`/contacts/${contact.id}/`)
  }
</script>

<Cosmetics label="Add friend" {onchange} />
