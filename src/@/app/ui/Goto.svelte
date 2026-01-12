<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  const { href }: { href: string } = $props()

  onMount(() => {
    goto(href)
  })
</script>
