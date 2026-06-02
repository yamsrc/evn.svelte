<script lang="ts">
  import { oidc } from '@/iam'
  import { Button } from '$ui/button'
  import { Loader } from '$com/loader'
  import { icons } from './icons'
  import type { Props } from './Button'

  const { idp, children, account, onauthenticate }: Props = $props()

  const Icon = $derived(icons[idp])

  async function onclick(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement

    button.disabled = true

    const result = await oidc.authenticate(idp, account?.id)

    button.disabled = false

    if (!(result instanceof Error) && account === undefined) onauthenticate?.(idp)
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
