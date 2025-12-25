<script lang="ts">
  import { QrCode } from '@lucide/svelte'
  import QRCodeStyling from 'qr-code-styling'
  import { browser } from '$app/environment'
  import { dict } from '$lib/intl'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button } from '$ui/button'
  import type { Props } from './QR'

  const { label, disabled, data, ...props }: Props = $props()

  let open = $state(false)
  let qrCode: QRCodeStyling | null = $state(null)
  let qrContainer: HTMLDivElement | null = $state(null)
  let qrCreated = $state(false)

  function createQRCode() {
    if (!browser || !qrContainer || qrCreated) return

    qrCode = new QRCodeStyling({
      type: 'svg',
      shape: 'square',
      width: 300,
      height: 300,
      data,
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
      },
      image: '/icons/512.png',
      imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 10,
      },
      dotsOptions: {
        type: 'extra-rounded',
        color: '#5f271a',
      },
      backgroundOptions: {
        color: '#f6e8d9',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#a43322',
      },
      cornersDotOptions: {
        color: '#a43322',
      },
    })

    qrCode.append(qrContainer)
    qrCreated = true
  }

  function copy() {
    navigator.clipboard?.writeText(data)
  }

  $effect(() => {
    if (!open) {
      qrCreated = false
      qrCode = null

      return
    }

    if (!qrContainer || qrCreated) return

    createQRCode()
  })
</script>

<Button {...props} {disabled} onclick={() => (open = true)}>
  <QrCode />
  {#if label !== null}{label}{/if}
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-sm bg-[#f6e8d9]">
    <div class="flex justify-center">
      <div bind:this={qrContainer}></div>
    </div>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={copy}>{$dict.actions.close}</AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
