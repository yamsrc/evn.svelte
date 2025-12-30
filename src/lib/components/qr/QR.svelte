<script lang="ts">
  import { QrCode } from '@lucide/svelte'
  import QRCodeStyling from 'qr-code-styling'
  import { browser } from '$app/environment'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button } from '$ui/button'
  import Logo from './logo.png'
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
      width: 500,
      height: 500,
      data,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
      },
      image: Logo,
      imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0,
      },
      dotsOptions: {
        type: 'extra-rounded',
        color: '#2E231A',
      },
      backgroundOptions: {
        color: '#EDE0D4',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#EA580C',
      },
      cornersDotOptions: {
        type: 'rounded',
      },
    })

    qrCode.append(qrContainer)
    qrCreated = true
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
  <AlertDialog.Content class="max-w-sm bg-transparent border-none" interactOutsideBehavior="close">
    <div class="flex justify-center size-full">
      <div bind:this={qrContainer} class="[&>svg]:size-full"></div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
