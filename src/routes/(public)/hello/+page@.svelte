<script lang="ts">
  import Stats from './sections/Stats.svelte'
  import Hero from './sections/Hero.svelte'
  import Header from './sections/Header.svelte'
</script>

<div id="top" class="relative z-0 min-h-screen bg-neutral-950 text-neutral-950">
  <Header />
  <main class="p-4 space-y-4">
    <Hero />
    <Stats />
  </main>
</div>
