<script lang="ts">
  import { back } from '$com/history'
  import { assign, create } from '@/adventures'
  import { getContext } from './Context'
  import Form from './Form.svelte'
  import type { Value } from './Context'
  import type { Props } from './Edit'

  let { id, value = $bindable(), busy = $bindable(false) }: Props = $props()

  const ctx = getContext()

  async function onsubmit(value: Value) {
    const body = {
      title: value.title,
      picture: value.picture,
      participants: value.participants,
    }

    const snapshot = JSON.parse(ctx.snapshot) as typeof ctx.value

    const changed =
      JSON.stringify(body) !==
      JSON.stringify({
        title: snapshot.title,
        picture: snapshot.picture,
        participants: snapshot.participants,
      })

    if (!changed) {
      await back(id === undefined ? '/expenses/' : `/adventures/${id}/`)

      return
    }

    const result = id === undefined ? await create(body) : await assign(id, body)

    if (result instanceof Error) return

    await back(`/adventures/${result.id}/`)
  }
</script>

<Form bind:value bind:busy {onsubmit} />
