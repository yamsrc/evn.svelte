<script lang="ts">
  import { create } from '@/groups'
  import { back } from '$com/history'
  import Form from './Form.svelte'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { id, value = $bindable(), busy = $bindable(false) }: Props = $props()

  async function onsubmit(value: Value) {
    if (id !== undefined) return back(`/contacts/groups/${id}/`)

    const group = await create({
      name: value.name,
      picture: value.picture || undefined,
      reduction: value.reduction,
      participants: value.identities.length > 0 ? value.identities : undefined,
    })

    if (group instanceof Error) return

    await back(`/contacts/groups/${group.id}/`)
  }
</script>

<Form bind:value bind:busy {onsubmit} />
