<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { del } from '@/expenses'
  import { Hold } from '$com/buttons'
  import { dict } from './intl'
  import type { Props } from './Delete'

  const { id, ondelete, ...props }: Props = $props()

  async function onclick() {
    const err = await del(id)

    if (err instanceof Error) return

    ondelete?.()
  }
</script>

<Hold
  name="delete-expense"
  variant="ghost"
  size="icon"
  position="left"
  label={$dict.delete.hold}
  duration={2000}
  {onclick}
  {...props}>
  <Trash2 class="text-destructive" />
</Hold>
