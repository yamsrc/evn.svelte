<script lang="ts">
  import { Fingerprint } from '@lucide/svelte'
  import { Loader } from '$com/loader'
  import { Button } from '$ui/button'
  import { passkeys } from '@/iam'
  import type { AccountLike } from '../AccountLike'

  const { account }: { account: AccountLike } = $props()

  async function onclick(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement

    button.disabled = true

    await passkeys.login(account.id)

    button.disabled = false
  }
</script>

<Button
  class="disabled:[&>.x-icon]:hidden [&>.x-loader]:hidden disabled:[&>.x-loader]:block"
  {onclick}
>
  <Fingerprint class="size-5 x-icon" />
  <Loader class="x-loader" />
  Continue
</Button>
