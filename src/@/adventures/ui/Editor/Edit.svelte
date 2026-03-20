<script lang="ts">
  import { back } from '$com/history'
  import { create } from '@/adventures'
  import Form from './Form.svelte'
  import type { Value } from './Context'
  import type { Props } from './Edit'

  let { id, value = $bindable(), busy = $bindable(false) }: Props = $props()

  async function onsubmit(value: Value) {
    if (id !== undefined) return back(`/adventures/${id}/`)

    const result = await create(value)

    if (result instanceof Error) return

    await back(`/adventures/${result.id}/`)
  }
</script>

<Form bind:value bind:busy {onsubmit} />
