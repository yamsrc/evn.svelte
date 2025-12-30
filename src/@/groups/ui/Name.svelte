<script lang="ts">
  import { Input } from '$com/input'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { update } from '@/groups'
  import type { Props } from './Name'

  const { id, name, class: classes }: Props = $props()

  async function onsubmit(value: string): Promise<string | undefined> {
    if (!id) return value

    const res = await update(id, { name: value })

    if (res instanceof Error) return value

    return res?.name
  }
</script>

<Input value={name} {onsubmit} class={cn('w-full max-w-sm text-3xl text-center', classes)} />
<p class="text-muted-foreground text-sm">{$dict.groups.name.description}</p>
