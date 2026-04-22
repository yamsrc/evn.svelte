<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { expenses } from '@/adventures'
  import { Hold } from '$com/buttons'
  import { dict } from '../intl'
  import type { Props } from './Delete'

  const { adventure, id, ondelete, ...props }: Props = $props()

  async function onclick() {
    const err = await expenses.del(adventure, id)

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
  duration={2000}
  {onclick}
  {...props}>
  <Trash2 class="text-destructive" />
</Hold>
