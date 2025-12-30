<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { Cosmetics, type Value } from '@/app/ui'
  import { create } from '@/groups'

  async function onchange(value: Value) {
    const res = await create({ name: value.name })

    if (res instanceof Error) return

    goto(`/contacts/groups/${res.id}`)
  }
</script>

<Cosmetics
  class="**:data-[slot=picture]:hidden"
  label={$dict.groups.create}
  note={$dict.groups.name.description}
  {onchange}
/>
