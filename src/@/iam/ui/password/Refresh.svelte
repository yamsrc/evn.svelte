<script lang="ts">
  import Form from './Form.svelte'
  import type { Method } from '@/iam'

  const { onauthenticate }: { onauthenticate?: (method: Method) => void } = $props()
</script>

<Form {onauthenticate} />
