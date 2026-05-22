<script lang="ts">
  import Stats from './sections/Stats.svelte'
  import Split from './sections/Split.svelte'
  import HowItWorks from './sections/HowItWorks.svelte'
  import Hero from './sections/Hero.svelte'
  import Header from './sections/Header.svelte'
  import Features from './sections/Features.svelte'
</script>

<div id="top" class="relative z-0 min-h-screen bg-neutral-950 text-white text-base">
  <Header />
  <main class="p-4 space-y-4">
    <Hero />
    <Stats />
    <Split />
    <HowItWorks />
    <Features />
  </main>
</div>
