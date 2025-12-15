<script lang="ts">
  import { onMount } from 'svelte'
  import { dev } from '$app/environment'
  import { afterNavigate, onNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { track } from '$com/history'
  import { meta } from '$config'
  import { mount, navigate } from '$lib/tools'
  import '../app.css'

  const { children } = $props()
  const title = $derived(page.data.meta?.title ?? meta.title)
  const description = $derived(page.data.meta?.description ?? meta.description)

  onMount(mount)
  onNavigate(navigate)
  afterNavigate(track)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  {#if dev}
    <meta name="robots" content="noindex,nofollow" />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

{@render children()}
