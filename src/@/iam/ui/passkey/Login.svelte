<script lang="ts">
  import { Loader } from '$com/loader'
  import { Button } from '$ui/button'
  import { passkeys } from '@/iam'

  let busy = $state(false)

  async function login() {
    busy = true

    await passkeys.login()

    busy = false
  }
</script>

<div class="flex flex-col items-center justify-center gap-2">
  <p class="text-sm">Already have an account?</p>
  <Button variant="outline" onclick={login}>
    {#if busy}
      <Loader />
    {:else}
      Sign in
    {/if}
  </Button>
</div>
