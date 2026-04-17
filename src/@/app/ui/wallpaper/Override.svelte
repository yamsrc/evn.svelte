<script lang="ts">
  import { override } from './Pattern'
  import type { Account } from '@/accounts/svc/net/Account'

  const { account }: { account: Account } = $props()

  const wallpaper = $derived({
    method: account.wallpaper?.method ?? 'pattern',
    pattern: account.wallpaper?.pattern ?? account.background,
    picture: account.wallpaper?.picture,
    effect: account.wallpaper?.effect ?? null,
  })

  $effect(() => {
    if (!wallpaper.pattern && !wallpaper.picture) return

    return override(wallpaper)
  })
</script>
