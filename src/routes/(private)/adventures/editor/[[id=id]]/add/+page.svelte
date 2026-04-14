<script lang="ts">
  import { Participants } from '@/app/ui'
  import { Editor } from '@/adventures/ui'
  import { page } from '$app/state'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
</script>

<Participants.Selector
  title={ctx.value.title}
  options={{ shareUrl: id ? `/join/adventures/${id}/` : undefined }} />
