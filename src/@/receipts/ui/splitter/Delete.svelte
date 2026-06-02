<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { del } from '@/receipts'
  import { Hold } from '$com/buttons'
  import { dict } from '../intl'
  import type { Props } from './Delete'

  const { id, ondelete, class: classes, ...props }: Props = $props()

  let busy = $state(false)

  async function onclick() {
    busy = true

    const err = await del(id)

    busy = false

    if (err instanceof Error) return

    ondelete?.()
  }
</script>

<Hold
  name="delete-receipt"
  variant="outline"
  size="icon"
  label={$dict.delete.label}
  disabled={busy}
  class={["[&_svg:not([class*='size-'])]:size-4! [&_svg]:text-destructive", classes]}
  {onclick}
  {...props}>
  <Trash2 />
</Hold>
