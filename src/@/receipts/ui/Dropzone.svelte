<script lang="ts">
  import { onMount } from 'svelte'
  import { Fullscreen } from '$com/fullscreen'
  import Progress from './Progress.svelte'
  import { dropzone, type Props } from './Dropzone'

  const { children, oncomplete }: Props = $props()

  let fullscreen = $state<Fullscreen | null>(null)
  let progress = $state<Progress | null>(null)

  function ondrop(file: File) {
    fullscreen?.show()
    progress?.upload(file)
  }

  onMount(() => {
    if (children === undefined) dropzone(window.document.body, { ondrop })
  })
</script>

<Fullscreen bind:this={fullscreen} controlled>
  {#if children}
    <div use:dropzone={{ ondrop }}>
      {@render children()}
    </div>
  {/if}
  {#snippet content()}
    <Progress bind:this={progress} {oncomplete} />
  {/snippet}
</Fullscreen>
