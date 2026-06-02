<script lang="ts">
  import { dict } from '@/iam/ui/intl'
  import Button from './Button.svelte'
  import type { Method, oidc } from '@/iam'

  const { idp, onauthenticate }: { idp: oidc.IDP; onauthenticate?: (method: Method) => void } = $props()

  const names: Record<oidc.IDP, string> = {
    google: 'Google',
    apple: 'Apple',
  }
</script>

<Button {idp} {onauthenticate}>
  {$dict.auth.continueWith(names[idp])}
</Button>
