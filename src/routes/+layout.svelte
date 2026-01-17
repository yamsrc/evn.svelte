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
  const image = $derived(page.data.meta?.image ?? meta.image)

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

  <meta property="og:image" content={image.url} />
  <meta property="og:image:width" content={image.width.toString()} />
  <meta property="og:image:height" content={image.height.toString()} />
  <meta property="og:image:type" content={image.type} />

  <!-- X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image.url} />
</svelte:head>

{@render children()}
