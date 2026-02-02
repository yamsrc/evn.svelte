<script lang="ts">
  import { dict } from '$lib/intl/dev'
  import { Button } from '$ui/button'
  import { Section, Header } from '@/app/ui'
  import { permission, ping, request } from '@/transmission'

  let busy = $state(false)

  const final = $derived($permission !== null && $permission !== 'default')

  async function requestPermission(): Promise<void> {
    if ($permission !== 'default') return

    busy = true
    await request()
    busy = false
  }

  async function sendPing(): Promise<void> {
    if (busy) return

    busy = true

    const result = await ping()

    if (result instanceof Error) console.error(result)

    busy = false
  }
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
        ? $dict.transmission.permission.label($permission)
        : $dict.transmission.permission.request}
    </Button>
    <Button id="transmission-ping-button" onclick={sendPing} disabled={busy}>
      {$dict.transmission.ping}
    </Button>
  </div>
</Section>
