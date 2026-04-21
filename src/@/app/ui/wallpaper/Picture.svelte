<script lang="ts">
  import { track } from '@vercel/analytics'
  import { ImageUp } from '@lucide/svelte'
  import { paywall } from '@/purchases/ui'
  import { account } from '@/iam'
  import { Gallery } from '@/app/ui'
  import { wallpaper } from '@/app/svc'
  import { transit } from '$lib/tools'
  import { dict } from '$lib/intl'

  const active = $derived($account?.wallpaper?.method === 'picture')
  let picture = $state<string>($account?.wallpaper?.picture ?? '')

  function gate(source: string, callback: () => void) {
    paywall({
      benefit: 'background',
      label: $dict.profile.background.cta,
      icon: ImageUp,
      source,
      callback,
    })
  }

  function onpick(picture: string) {
    void transit(() => void wallpaper.set({ method: 'picture', picture }))
    track('Wallpaper.Picture')
  }
</script>

<Gallery
  bind:picture
  {active}
  presets={wallpaper.presets}
  upload={wallpaper.upload}
  variant="1280x2700"
  densities={[1]}
  card="aspect-1/2"
  placement="end"
  {gate}
  {onpick} />
