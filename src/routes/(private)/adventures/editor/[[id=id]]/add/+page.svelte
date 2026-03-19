<script lang="ts">
  import { page } from '$app/state'
  import { Editor } from '@/adventures/ui'
  import { Participants } from '@/app/ui'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
</script>

<Participants.Selector
  title={ctx.value.title}
  options={{ shareUrl: id ? `/join/adventures/${id}/` : undefined }} />
