<script lang="ts">
  import { Editor } from '@/groups/ui'
  import { Participants } from '@/app/ui'
  import { page } from '$app/state'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
</script>

<Participants.Selector
  title={ctx.value.name}
  options={{ shareUrl: id ? `/join/group/${id}/` : undefined }} />
