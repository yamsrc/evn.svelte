<script lang="ts">
  import { oidc } from '$config'
  import { Authenticated } from '@/app/ui'

  const { children } = $props()
</script>

<Authenticated {oidc}>
  {@render children()}
</Authenticated>
