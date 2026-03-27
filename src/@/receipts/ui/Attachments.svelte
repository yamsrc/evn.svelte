<script lang="ts">
  import { Attachments } from '@/expenses/ui'
  import type { Props } from './Attachments'

  const { attachments, class: classes }: Props = $props()
</script>

<Attachments attachments={attachments ?? []} path="/receipts/attachments/" class={classes} />
