<script lang="ts">
  import { Participants } from '@/app/ui'
  import { Editor } from '@/expenses/ui'

  const ctx = Editor.getContext()
</script>

<Participants.Selector
  title={ctx.value.title}
  options={{ managedContactsCreation: true }} />
