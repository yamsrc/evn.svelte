<script lang="ts">
  import { onMount } from 'svelte'
  import { override } from './Background'
  import type { Account } from '@/accounts/svc/net/Account'

  const { account }: { account: Account } = $props()

  onMount(() => {
    const pattern = account.wallpaper?.pattern ?? account.background

    if (!pattern) return

    return override({
      method: account.wallpaper?.method ?? 'pattern',
      pattern,
      effect: account.wallpaper?.effect ?? null,
    })
  })
</script>
