<script lang="ts">
  import { Fingerprint } from '@lucide/svelte'
  import { dict } from '@/iam/ui/intl'
  import { passkeys } from '@/iam'
  import { Button } from '$ui/button'
  import { Loader } from '$com/loader'
  import type { Method } from '@/iam'
  import type { AccountLike } from '../AccountLike'

  const { account, onauthenticate }: {
    account: AccountLike
    onauthenticate?: (method: Method) => void
  } = $props()

  async function onclick(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement

    button.disabled = true

    const result = await passkeys.login(account.id)

    button.disabled = false

    if (!(result instanceof Error)) onauthenticate?.('passkey')
  }
</script>

<Button
  class="disabled:[&>.x-icon]:hidden [&>.x-loader]:hidden disabled:[&>.x-loader]:block"
  {onclick}>
  <Fingerprint class="size-5 x-icon" />
  <Loader class="x-loader" />
  {$dict.auth.refresh.continue}
</Button>
