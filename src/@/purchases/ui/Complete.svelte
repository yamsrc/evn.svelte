<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Avatar } from '@/accounts/ui'
  import { Button } from '$ui/button'
  import { image } from '$lib/tools'
  import { open } from './store'
  import { dict } from './intl'
  import { type Props, assets } from './Complete'

  const { cta, next }: Props = $props()

  function onclick() {
    cta?.callback()
    open.set(false)
    next()
  }
</script>

<div class="space-y-4">
  <div
    class="w-full aspect-7/5 border border-border rounded-lg overflow-hidden flex items-center justify-center bg-background bg-cover bg-center bg-no-repeat"
    style:background-image={image.imageSet(assets)}>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-constructive rounded-full size-14 flex items-center justify-center text-white">
        <Check class="size-10" strokeWidth={1.5} />
      </div>
      <p class="text-center text-lg font-bold max-w-2xs">
        {$dict.paywall.complete.thanks}
      </p>
    </div>
  </div>
  <div class="flex gap-4">
    {#if $account}
      <div class="shrink-0">
        <Avatar account={$account} size={75} />
      </div>
    {/if}
    <div>
      <p>{$dict.paywall.complete.avatarNote}</p>
      <p>{$dict.paywall.complete.featuresNote}</p>
    </div>
  </div>
  {#if cta}
    <Button {onclick} class="w-full" size="lg">
      {#if cta.icon}
        <cta.icon />
      {/if}
      <span>{cta.label}</span>
    </Button>
  {/if}
</div>
