<script lang="ts">
  import { Background } from '@/app/ui'
  import { navigate, suppressContextMenu } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { meta } from '$config/configuration'
  import { track } from '$com/history'
  import { page } from '$app/state'
  import { afterNavigate, onNavigate } from '$app/navigation'
  import { dev } from '$app/environment'
  import '../app.css'

  const { children } = $props()
  const title = $derived(page.data.meta?.title ?? meta.title)
  const description = $derived(page.data.meta?.description ?? meta.description)
  const keywords = $derived(page.data.meta?.keywords)
  const image = $derived(page.data.meta?.image ?? meta.image)

  onNavigate(navigate)
  afterNavigate((nav) => track(nav, page.state))

  $effect(() => {
    document.dir = $dict.dir
  })
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

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

<svelte:body oncontextmenu={suppressContextMenu} />

<Background class="fixed inset-0 -z-50 pointer-events-none" />
{@render children()}
