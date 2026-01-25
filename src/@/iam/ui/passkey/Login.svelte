<script lang="ts">
  import { Fingerprint } from '@lucide/svelte'
  import { Loader } from '$com/loader'
  import { Button } from '$ui/button'
  import { passkeys } from '@/iam'
  import { dict } from '@/iam/ui/intl'

  let busy = $state(false)

  async function login() {
    busy = true

    await passkeys.login()

    busy = false
  }
</script>

<div class="flex flex-col items-center justify-center gap-2">
  <p>{$dict.auth.alreadyHaveAccount}</p>
  <Button id="iam-passkey-login-button" variant="secondary" onclick={login} size="lg">
    {#if busy}
      <Loader />
    {:else}
      <Fingerprint />
    {/if}
    {$dict.auth.signin}
  </Button>
</div>
