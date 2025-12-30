<script lang="ts">
  import { assets } from '$config'
  import { deterministic } from '$lib/tools'
  import { Picture } from '@/accounts/ui'
  import { account } from '@/iam'
  import type { Props } from './Avatar'

  const props: Props = $props()

  const accountWithPicture = $derived(
    $account && {
      ...$account,
      picture: $account.picture || assets[deterministic($account.id, assets.length)],
    },
  )
</script>

{#if accountWithPicture}
  <Picture account={accountWithPicture} {...props} />
{/if}
