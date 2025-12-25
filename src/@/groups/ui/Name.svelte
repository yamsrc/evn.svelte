<script lang="ts">
  import { Input } from '$com/input'
  import { cn } from '$lib/utils'
  import { create, update } from '@/groups'
  import type { Props } from './Name'

  const { id, name, class: classes, oncreated }: Props = $props()

  async function submit(name: string): Promise<string | undefined> {
    const res = id === undefined ? await create({ name }) : await update(id, { name })

    if (res instanceof Error) return name

    if (res !== undefined && id === undefined) oncreated?.(res.id)
  }
</script>

<Input value={name} onsubmit={submit} class={cn('w-full max-w-sm text-3xl text-center', classes)} />
