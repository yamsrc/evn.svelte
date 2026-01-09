<script lang="ts">
  import { Button } from '$ui/button'
  import type { Snippet } from 'svelte'

  interface Props {
    label?: string
    busy?: boolean
    disabled?: boolean
    onclick?: () => void
    class?: string
    children?: Snippet
  }

  const { label, busy = false, disabled, onclick, class: classes, children }: Props = $props()
</script>

{#if children}
  <div class={classes ?? 'w-full'} role="group">
    {@render children()}
  </div>
{:else if label}
  <Button
    id="app-cosmetics-submit-button"
    size="lg"
    class={classes ?? 'w-full'}
    disabled={disabled || busy}
    {onclick}
  >
    {label}
  </Button>
{/if}
