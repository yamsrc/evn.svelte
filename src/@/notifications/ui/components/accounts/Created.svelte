<script lang="ts">
  import type { Props } from './Created'

  const { notification }: Props = $props()
</script>

{#if notification}
  <div class="text-sm">Welcome to the app!</div>
{/if}
