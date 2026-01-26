<script lang="ts">
  import { browser } from '$app/environment'
  import { subscribe } from '@/push'
  import type { Props } from './Permission'

  const { onRequest }: Props = $props()

  let permission = $state<NotificationPermission | null>(null)
  let isRequesting = $state(false)

  if (browser && 'Notification' in window) permission = Notification.permission

  async function requestPermission() {
    if (!browser || !('Notification' in window)) return

    isRequesting = true

    try {
      const result = await subscribe()

      if (result instanceof Error) console.error('Failed to subscribe:', result)
      else {
        permission = Notification.permission
        onRequest?.()
      }
    } finally {
      isRequesting = false
    }
  }

  $effect(() => {
    if (browser && 'Notification' in window) permission = Notification.permission
  })
</script>

{#if browser && 'Notification' in window}
  {#if permission === 'default'}
    <button id="push-permission-request-button" onclick={requestPermission} disabled={isRequesting}>
      {isRequesting ? 'Requesting...' : 'Enable Notifications'}
    </button>
  {:else if permission === 'granted'}
    <div id="push-permission-granted">Notifications enabled</div>
  {:else if permission === 'denied'}
    <div id="push-permission-denied">Notifications disabled</div>
  {/if}
{/if}
