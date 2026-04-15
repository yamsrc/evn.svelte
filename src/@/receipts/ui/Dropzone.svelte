<script lang="ts">
  import { Fullscreen } from '$com/fullscreen'
  import Progress from './Progress.svelte'
  import { dropzone, type Props } from './Dropzone'

  let progress = $state<Progress | null>(null)

  const { children, oncomplete }: Props = $props()
</script>

<Fullscreen controlled>
  <div use:dropzone>
    {@render children?.()}
  </div>
  {#snippet content()}
    <Progress bind:this={progress} {oncomplete} />
  {/snippet}
</Fullscreen>
