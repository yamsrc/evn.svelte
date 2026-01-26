<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { Button } from '$ui/button'
  import { ping } from '@/transmission'

  let permission = $state<NotificationPermission | 'unsupported'>('unsupported')
  let busy = $state(false)
  let status = $state<string | null>(null)

  function refreshPermission(): void {
    if (!browser || !('Notification' in window)) {
      permission = 'unsupported'

      return
    }

    permission = Notification.permission
  }

  async function requestPermission(): Promise<void> {
    if (!browser || !('Notification' in window)) {
      status = 'Notifications not supported'
      permission = 'unsupported'

      return
    }

    status = null
    permission = await Notification.requestPermission()
  }

  async function sendPing(): Promise<void> {
    if (busy) return

    busy = true
    status = null

    const result = await ping()

    if (result instanceof Error) status = result.message
    else status = `Sent ${result.n} notification(s)`

    busy = false
  }

  onMount(refreshPermission)
</script>

<div class="flex-1 flex flex-col gap-4 p-5">
  <header class="flex flex-col gap-1">
    <h1 class="text-lg font-semibold">Push debug</h1>
    <div id="transmission-permission-status" class="text-sm text-muted-foreground">
      Permission: {permission}
    </div>
  </header>

  <div class="flex flex-wrap gap-2">
    <Button
      id="transmission-permission-button"
      variant="secondary"
      onclick={requestPermission}
      disabled={permission === 'denied' || permission === 'unsupported'}>
      Request permission
    </Button>
    <Button
      id="transmission-ping-button"
      onclick={sendPing}
      disabled={busy || permission !== 'granted'}>
      Send ping
    </Button>
  </div>

  {#if status}
    <div id="transmission-status-text" class="text-sm text-muted-foreground" aria-live="polite">
      {status}
    </div>
  {/if}
</div>
