<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { paywall } from '@/purchases/ui'
  import { account } from '@/iam'
  import { Gallery } from '@/app/ui'
  import { wallpaper } from '@/app/svc'
  import { transit } from '$lib/tools'
  import { dict } from '$lib/intl'

  let picture = $state<string>($account?.wallpaper?.picture ?? '')

  function gate(run: () => void) {
    paywall({
      benefit: 'background',
      label: $dict.profile.background.cta,
      icon: ImageUp,
      callback: run,
    })
  }

  function onpick(picture: string) {
    void transit(() => void wallpaper.set({ method: 'picture', picture }))
  }
</script>

<Gallery
  bind:picture
  presets={wallpaper.presets}
  upload={wallpaper.upload}
  variant="1280x2700"
  card="aspect-1/2"
  placement="end"
  {gate}
  {onpick} />
