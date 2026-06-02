<!-- eslint-disable svelte/no-at-html-tags -->

<script lang="ts">
  const id = import.meta.env.VITE_GA_ID

  import { onMount } from 'svelte'

  onMount(() => {
    window.dataLayer = window.dataLayer || []

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(...args)
    }

    window.gtag('js', new Date())
    window.gtag('config', id)
  })
</script>

<svelte:head>
  {#if id}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
  {/if}
</svelte:head>
