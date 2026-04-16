<script lang="ts">
  import { onMount } from 'svelte'
  import Progress from '@/receipts/ui/Progress.svelte'
  import { Fullscreen } from '$com/fullscreen'
  import { goto } from '$app/navigation'

  let fullscreen = $state<Fullscreen | null>(null)
  let progress = $state<Progress | null>(null)

  function oncomplete(id: string) {
    goto(`/receipts/${id}/`)
  }

  onMount(async () => {
    const cache = await caches.open('share')
    const response = await cache.match('/share/file')

    await cache.delete('/share/file')

    if (response === undefined) return goto('/')

    const name = response.headers.get('X-File-Name') ?? 'shared.jpg'
    const type = response.headers.get('Content-Type') ?? 'image/jpeg'
    const blob = await response.blob()
    const file = new File([blob], name, { type })

    fullscreen?.show()
    progress?.upload(file)
  })
</script>

<Fullscreen bind:this={fullscreen} controlled x={false}>
  <div></div>
  {#snippet content()}
    <Progress bind:this={progress} {oncomplete} />
  {/snippet}
</Fullscreen>
