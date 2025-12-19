<script lang="ts">
  import { dict } from '@/iam/ui/intl'
  import Button from './Button.svelte'
  import type { IDP } from '@/iam'

  const { idp }: { idp: IDP } = $props()

  const names: Record<IDP, string> = {
    google: 'Google',
    apple: 'Apple',
  }
</script>

<Button {idp}>
  {$dict.auth.continueWith(names[idp])}
</Button>
