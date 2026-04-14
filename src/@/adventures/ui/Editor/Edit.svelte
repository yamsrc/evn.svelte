<script lang="ts">
  import { create } from '@/adventures'
  import { back } from '$com/history'
  import Form from './Form.svelte'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { id, value = $bindable(), busy = $bindable(false) }: Props = $props()

  async function onsubmit(value: Value) {
    if (id !== undefined) return back(`/adventures/${id}/`)

    const result = await create(value)

    if (result instanceof Error) return

    await back(`/adventures/${result.id}/`)
  }
</script>

<Form bind:value bind:busy {onsubmit} />
