<script lang="ts">
  import { Editor } from '@/expenses/ui'
  import { Participants } from '@/app/ui'

  const ctx = Editor.getContext()
</script>

<Participants.Selector
  title={ctx.value.title}
  options={{ managedContactsCreation: true }} />
