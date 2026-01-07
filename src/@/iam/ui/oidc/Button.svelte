<script lang="ts">
  import { Loader } from '$com/loader'
  import { Button } from '$ui/button'
  import { oidc } from '@/iam'
  import { icons } from './icons'
  import type { Snippet } from 'svelte'

  const { idp, children }: { idp: oidc.IDP; children?: Snippet } = $props()

  const Icon = $derived(icons[idp])

  async function onclick(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement

    button.disabled = true

    await oidc.authenticate(idp)
  }
</script>

<Button
  variant="outline"
  size={children ? 'default' : 'icon'}
  {onclick}
  class="disabled:[&_.x-icon]:hidden [&_.x-loader]:hidden disabled:[&_.x-loader]:block"
>
  <Icon class="x-icon" />
  <Loader class="x-loader" />
  {@render children?.()}
</Button>
