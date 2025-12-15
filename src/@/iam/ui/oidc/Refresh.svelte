<script lang="ts">
  import Button from './Button.svelte'
  import type { IDP } from '@/iam'

  const { idp }: { idp: IDP } = $props()

  const names: Record<IDP, string> = {
    google: 'Google',
    apple: 'Apple',
  }
</script>

<Button {idp}>Continue with {names[idp]}</Button>
