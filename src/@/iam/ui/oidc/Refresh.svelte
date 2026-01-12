<script lang="ts">
  import { dict } from '@/iam/ui/intl'
  import Button from './Button.svelte'
  import type { oidc } from '@/iam'

  const { idp }: { idp: oidc.IDP } = $props()

  const names: Record<oidc.IDP, string> = {
    google: 'Google',
    apple: 'Apple',
  }
</script>

<Button {idp}>
  {$dict.auth.continueWith(names[idp])}
</Button>
