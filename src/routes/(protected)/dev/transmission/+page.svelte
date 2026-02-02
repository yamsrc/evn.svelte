<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { dict } from '$lib/intl/dev'
  import { Button } from '$ui/button'
  import { Section, Header } from '@/app/ui'
  import { ping, subscribe } from '@/transmission'

  let permission = $state<NotificationPermission | 'unsupported' | null>(null)
  let busy = $state(false)

  const final = $derived(permission !== null && permission !== 'default')

  function checkPermission(): void {
    if (!browser || !('Notification' in window)) {
      permission = 'unsupported'

      return
    }

    permission = Notification.permission
  }

  async function requestPermission(): Promise<void> {
    if (!browser || !('Notification' in window)) {
      permission = 'unsupported'

      return
    }

    if (permission !== 'default') return

    const result = await Notification.requestPermission()

    permission = result

    if (result === 'granted') {
      busy = true

      const result = await subscribe()

      if (result instanceof Error) console.error(result)

      busy = false
    }
  }

  async function sendPing(): Promise<void> {
    if (busy) return

    busy = true

    const result = await ping()

    if (result instanceof Error) console.error(result)

    busy = false
  }

  onMount(checkPermission)
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.transmission.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <div class="flex flex-wrap gap-2">
    <Button
      id="transmission-permission-button"
      variant="secondary"
      onclick={requestPermission}
      disabled={final}>
      {final
        ? $dict.transmission.permission.label(permission)
        : $dict.transmission.permission.request}
    </Button>
    <Button
      id="transmission-ping-button"
      onclick={sendPing}
      disabled={busy || permission !== 'granted'}>
      {$dict.transmission.ping}
    </Button>
  </div>
</Section>
