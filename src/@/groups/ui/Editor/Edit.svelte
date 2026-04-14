<script lang="ts">
  import { create } from '@/groups'
  import { goto } from '$app/navigation'
  import Form from './Form.svelte'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { value = $bindable(), busy = $bindable(false) }: Props = $props()

  async function onsubmit(value: Value) {
    const group = await create({
      name: value.name,
      reduction: value.reduction,
      participants: value.identities.length > 0 ? value.identities : undefined,
    })

    if (group instanceof Error) return

    await goto(`/contacts/groups/${group.id}/`)
  }
</script>

<Form bind:value bind:busy {onsubmit} />
