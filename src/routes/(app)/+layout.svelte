<script lang="ts">
  import { Authenticated } from '@/iam/ui'

  const { children } = $props()
</script>

<Authenticated>
  {@render children()}
</Authenticated>
