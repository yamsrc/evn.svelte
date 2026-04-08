<script lang="ts">
  import { onMount } from 'svelte'
  import { override } from './Pattern'
  import type { Account } from '@/accounts/svc/net/Account'

  const { account }: { account: Account } = $props()

  onMount(() => {
    const pattern = account.wallpaper?.pattern ?? account.background
    const picture = account.wallpaper?.picture

    if (!pattern && !picture) return

    return override({
      method: account.wallpaper?.method ?? 'pattern',
      pattern,
      picture,
      effect: account.wallpaper?.effect ?? null,
    })
  })
</script>
