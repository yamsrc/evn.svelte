<script lang="ts">
  import { track } from '@vercel/analytics'
  import { ScanText } from '@lucide/svelte'
  import { paywall } from '@/purchases/ui'
  import { account } from '@/iam'
  import { premium } from '@/accounts'
  import { Button } from '$ui/button'
  import { styles, takeoff } from '$lib/tools'
  import { Fullscreen } from '$com/fullscreen'
  import { dict } from './intl'
  import Progress from './Progress.svelte'
  import type { Props } from './Button'

  const { oncomplete: callback, id = 'scan-button', class: classes, ...props }: Props = $props()

  const subscribed = $derived($account && premium($account))

  let fullscreen = $state<Fullscreen | null>(null)
  let progress = $state<Progress | null>(null)
  let input = $state<HTMLInputElement | null>(null)
  let open = $state(false)

  function onclick() {
    if (subscribed) return input?.click()

    takeoff(id, 'paywall', 'transition-spring transition-morph')

    paywall({
      benefit: 'scan',
      label: $dict.action.label,
      icon: ScanText,
      callback: () => input?.click(),
    })
  }

  function oninput(e: Event) {
    takeoff(id, 'receipt', 'transition-spring transition-morph')

    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    if (file === undefined) return

    target.value = ''
    fullscreen?.show()
    progress?.upload(file)
    track('Receipts.Upload')
  }

  function oncomplete(id: string) {
    if (open) callback?.(id)
  }

  const style = styles('receipt', 'transition-spring transition-morph fullscreen-content')
</script>

<div>
  <input bind:this={input} type="file" class="sr-only" {oninput} accept="image/*" />

  <Fullscreen bind:this={fullscreen} bind:open controlled>
    <Button {id} {onclick} class={['scan size-full', classes]} {...props}>
      <ScanText />
      <span>{$dict.action.label}</span>
    </Button>
    {#snippet content()}
      <Progress bind:this={progress} style={$style} onretry={onclick} {oncomplete} />
    {/snippet}
  </Fullscreen>
</div>
