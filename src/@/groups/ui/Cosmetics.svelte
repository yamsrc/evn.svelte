<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl'
  import { Cosmetics, type Value } from '@/app/ui'
  import * as groups from '@/groups'
  import type { Props } from './Cosmetics'

  const { group }: Props = $props()
  const value = $derived(group ? { name: group.name } : undefined)
  const label = $derived(group ? undefined : $dict.groups.create)

  async function onchange(value: Value) {
    if (group === undefined) await create(value)
    else await groups.update(group.id, { name: value.name })
  }

  async function create(value: Value) {
    const created = await groups.create({ name: value.name })

    if (created instanceof Error) return

    goto(`/contacts/groups/${created.id}`)
  }
</script>

<Cosmetics
  {value}
  placeholder={$dict.groups.name.placeholder}
  note={$dict.groups.name.description}
  {label}
  {onchange}
  class="**:data-[slot=picture]:hidden"
/>
