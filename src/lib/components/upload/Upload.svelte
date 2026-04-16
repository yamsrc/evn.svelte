<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Upload'

  const { children, accept, multiple, onfiles, ...rest }: Props = $props()

  let ref = $state<HTMLInputElement | null>(null)

  function proxy(e: Event) {
    const target = e.target as HTMLInputElement

    if (target.files === null) return

    const files = Array.from(target.files)

    // reset
    target.value = ''

    onfiles?.(files)
  }
</script>

<Button onclick={() => ref?.click()} {...rest}>
  {@render children?.()}
  <input bind:this={ref} type="file" class="hidden" {accept} {multiple} oninput={proxy} />
</Button>
