<script lang="ts">
  import { onMount } from 'svelte'
  import { override } from './Background'

  const { id }: { id: string } = $props()

  onMount(() => override(id))
</script>
