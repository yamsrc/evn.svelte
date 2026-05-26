<script lang="ts">
  import { dev } from '$app/environment'
  import Stats from './sections/Stats.svelte'
  import Split from './sections/Split.svelte'
  import Reviews from './sections/Reviews.svelte'
  import HowItWorks from './sections/HowItWorks.svelte'
  import Hero from './sections/Hero.svelte'
  import Header from './sections/Header.svelte'
  import Footer from './sections/Footer.svelte'
  import Features from './sections/Features.svelte'
  import Download from './sections/Download.svelte'
  import BuiltForLife from './sections/BuiltForLife.svelte'
</script>

<svelte:head>
  {#if !dev}
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18042621492"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'AW-18042621492')
    </script>
  {/if}
</svelte:head>

<div id="top" class="relative z-0 min-h-screen bg-neutral-950 text-[#EDE0D4] text-base">
  <Header />
  <main class="p-4 space-y-4">
    <Hero />
    <Stats />
    <Split />
    <HowItWorks />
    <Features />
    <Reviews />
    <BuiltForLife />
    <Download />
    <Footer />
  </main>
</div>
