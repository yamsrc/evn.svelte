<script lang="ts">
  import { page } from '$app/state'
  import { Participants } from '@/app/ui'
  import { Editor } from '@/groups/ui'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
</script>

<Participants.Selector
  title={ctx.value.name}
  options={{ shareUrl: id ? `/join/group/${id}/` : undefined }} />
