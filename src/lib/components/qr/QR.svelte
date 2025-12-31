<script lang="ts">
  import { QrCode } from '@lucide/svelte'
  import { tick } from 'svelte'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import Spinner from '$ui/spinner/spinner.svelte'
  import { createQR, type Props } from './QR'

  const { label, disabled, text, class: classes, ...props }: Props = $props()

  let open = $state(false)
  let busy = $state(false)
  let container: HTMLDivElement | null = $state(null)

  async function onclick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    busy = true

    const qr = await createQR(text)

    busy = false

    if (qr === null) return

    open = true

    await tick() // bind container

    if (!container) throw new Error('Container not bound')

    qr.append(container)
  }
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger
    class={cn(buttonVariants(props), classes)}
    disabled={busy || disabled}
    {onclick}
  >
    {#if busy}
      <Spinner />
    {:else}
      <QrCode />
    {/if}
    {#if label !== null}{label}{/if}
  </AlertDialog.Trigger>
  <AlertDialog.Content class="max-w-sm bg-transparent border-none" interactOutsideBehavior="close">
    <div class="flex justify-center size-full aspect-square bg-red-200 rounded-lg overflow-hidden">
      <div bind:this={container} class="[&>svg]:size-full"></div>
    </div>
    <AlertDialog.Footer>
      <Button variant="secondary" size="lg" onclick={() => (open = false)}>
        {$dict.actions.close}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
