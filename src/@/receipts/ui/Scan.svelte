<script lang="ts">
  import { ScanText } from '@lucide/svelte'
  import { upload, type Progress } from '@/receipts'
  import { paywall } from '@/purchases/ui'
  import { account } from '@/iam'
  import { premium } from '@/accounts'
  import { Button } from '$ui/button'
  import { styles } from '$lib/tools'
  import { Fullscreen } from '$com/fullscreen'
  import { dict } from './intl'
  import Process from './Progress.svelte'
  import type { Readable } from 'svelte/store'
  import type { Props } from './Button'

  const { oncomplete: callback, ...props }: Props = $props()

  let fullscreen = $state<Fullscreen | null>(null)
  let input = $state<HTMLInputElement | null>(null)
  let file = $state<File | undefined>()
  let progress = $state<Readable<Progress> | undefined>()
  let open = $state(false)

  function onclick() {
    paywall({
      benefit: 'scan',
      label: $dict.action.label,
      icon: ScanText,
      callback: () => input?.click(),
    })
  }
  function oninput(e: Event) {
    const target = e.target as HTMLInputElement

    file = target.files?.[0]

    if (file === undefined) return

    target.value = ''
    fullscreen?.show()
    progress = upload(file)
  }

  function oncomplete(id: string) {
    if (open) callback?.(id)
  }

  const style = styles(
    $account && premium($account) ? 'receipt' : 'paywall',
    'transition-spring transition-morph',
  )
</script>

<div>
  <input bind:this={input} type="file" class="sr-only" {oninput} accept="image/*" />

  <Fullscreen bind:this={fullscreen} bind:open controlled>
    <Button {onclick} {...props} style={$style}>
      <ScanText />
      <span>{$dict.action.label}</span>
    </Button>
    {#snippet content()}
      {#if file && $progress}
        <Process {file} progress={$progress} style={$style} onretry={onclick} {oncomplete} />
      {/if}
    {/snippet}
  </Fullscreen>
</div>
