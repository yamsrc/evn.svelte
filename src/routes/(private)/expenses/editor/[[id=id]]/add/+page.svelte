<script lang="ts">
  import { Editor } from '@/expenses/ui'
  import { Participants } from '@/app/ui'
  import { dict } from '$lib/intl'

  const ctx = Editor.getContext()
</script>

<Participants.Selector
  title={ctx.value.title || $dict.expenses.participants.title}
  options={{ managedContactsCreation: true }} />
