<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    class?: string
  }

  const { children, class: classes }: Props = $props()
</script>

<p class="text-muted-foreground text-sm text-center {classes ?? ''}" role="note">
  {@render children()}
</p>
