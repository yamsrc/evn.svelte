<script lang="ts">
  import { onMount } from 'svelte'
  import { Fullscreen } from '$com/fullscreen'
  import Progress from './Progress.svelte'
  import { dropzone, type Props } from './Dropzone'

  const { children, oncomplete: callback }: Props = $props()

  let open = $state(false)
  let fullscreen = $state<Fullscreen | null>(null)
  let progress = $state<Progress | null>(null)

  function ondrop(file: File) {
    fullscreen?.show()
    progress?.upload(file)
  }

  function oncomplete(id: string) {
    if (open) {
      callback?.(id)
      fullscreen?.hide()
    }
  }

  onMount(() => {
    if (children === undefined) dropzone(window.document.body, { ondrop })
  })
</script>

<Fullscreen bind:this={fullscreen} bind:open controlled>
  {#if children}
    <div use:dropzone={{ ondrop }}>
      {@render children()}
    </div>
  {/if}
  {#snippet content()}
    <Progress bind:this={progress} {oncomplete} />
  {/snippet}
</Fullscreen>
