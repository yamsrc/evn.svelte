<script lang="ts">
  import { Screen } from '$com/shell'
  import { oidc } from '$config'
  import { Authenticated } from '@/app/ui'

  const { children } = $props()
</script>

<Authenticated {oidc}>
  <Screen class="flex-1 flex flex-col justify-between">
    {@render children()}
  </Screen>
</Authenticated>
