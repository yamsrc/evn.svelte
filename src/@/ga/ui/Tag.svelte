<!-- eslint-disable svelte/no-at-html-tags -->

<script lang="ts">
  import { onMount } from 'svelte'

  const id = import.meta.env.VITE_GA_ID

  onMount(() => {
    if (!id) return

    window.dataLayer = window.dataLayer || []

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(...args)
    }

    window.gtag('js', new Date())
    window.gtag('config', id, { send_page_view: false })
  })
</script>

{#if id}
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
{/if}
