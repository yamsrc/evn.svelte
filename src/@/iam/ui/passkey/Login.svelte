<script lang="ts">
  import { Fingerprint } from '@lucide/svelte'
  import { dict } from '@/iam/ui/intl'
  import { passkeys, type Method } from '@/iam'
  import { Button } from '$ui/button'
  import { Loader } from '$com/loader'

  const { onauthenticate }: { onauthenticate?: (method: Method) => void } = $props()

  let busy = $state(false)

  async function login() {
    busy = true

    const result = await passkeys.login()

    busy = false

    if (!(result instanceof Error)) onauthenticate?.('passkey')
  }
</script>

<div class="flex flex-col items-center justify-center gap-2">
  <p>{$dict.auth.alreadyHaveAccount}</p>
  <Button id="iam-passkey-login-button" variant="secondary" onclick={login}>
    {#if busy}
      <Loader />
    {:else}
      <Fingerprint />
    {/if}
    {$dict.auth.signin}
  </Button>
</div>
