<script lang="ts">
  import { Loader } from '$com/loader'
  import { Button } from '$ui/button'
  import { apple, oidc, type IDP } from '@/iam'
  import { icons } from './icons'
  import type { Snippet } from 'svelte'

  const { idp, children }: { idp: IDP; children?: Snippet } = $props()
  const Icon = $derived(icons[idp])

  let disabled = $state(false)

  async function onclick() {
    disabled = true

    if (idp === 'apple') {
      await apple()
      disabled = false
    } else oidc(idp)
  }
</script>

<Button
  variant="outline"
  size={children ? 'default' : 'icon'}
  {onclick}
  {disabled}
  data-idp="google"
  class="backdrop-blur bg-card/50"
>
  {#if disabled}
    <Loader />
  {:else}
    <Icon />
  {/if}
  {@render children?.()}
</Button>
