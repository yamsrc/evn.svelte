<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { expenses } from '@/adventures'
  import { Hold } from '$com/buttons'
  import { dict } from '../intl'
  import type { Props } from './Delete'

  const { adventure, id, ondelete, ...props }: Props = $props()

  let busy = $state(false)

  async function onclick() {
    busy = true

    const err = await expenses.del(adventure, id)

    busy = false

    if (err instanceof Error) return

    ondelete?.()
  }
</script>

<Hold
  name="delete-adventure-expense"
  variant="ghost"
  size="icon"
  position="left"
  label={$dict.expenses.delete.hold}
  disabled={busy}
  {onclick}
  {...props}>
  <Trash2 class="text-destructive" />
</Hold>
