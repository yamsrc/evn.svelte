<script lang="ts">
  import { Fullscreen } from '$com/fullscreen'
  import Progress from './Progress.svelte'
  import { dropzone, type Props } from './Dropzone'

  let fullscreen = $state<Fullscreen | null>(null)
  let progress = $state<Progress | null>(null)

  const { children, oncomplete }: Props = $props()

  function ondrop(file: File) {
    fullscreen?.show()
    progress?.upload(file)
  }
</script>

<Fullscreen bind:this={fullscreen} controlled>
  <div use:dropzone={{ ondrop }}>
    {@render children?.()}
  </div>
  {#snippet content()}
    <Progress bind:this={progress} {oncomplete} />
  {/snippet}
</Fullscreen>
