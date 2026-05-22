<script lang="ts">
  const tags = [
    'Dinners With Friends',
    'Travel & Group Trips',
    'Shared Apartments',
    'Nights Out',
    'Other Expenses',
  ]
</script>

<section class="max-w-7xl mx-auto bg-[#ECE0D4] text-neutral-900 rounded-3xl px-6 md:px-12 py-12 md:py-20 overflow-hidden space-y-4 md:space-y-8">
  <div class="text-center max-w-3xl mx-auto space-y-2">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">
      For Every Moment You Share
    </p>
    <div role="heading" aria-level="2" class="text-4xl md:text-6xl font-bold leading-tight text-black">
      Built for Real Life
    </div>
    <p class="text-neutral-600 text-balance">
      From dinners and nights out to trips and everyday expenses — Evnly adapts to any situation,
      making it easy to split costs with friends, roommates, or anyone in between.
    </p>
  </div>

  <ul class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
    {#each tags as tag (tag)}
      <li class="rounded-2xl bg-[#D9C9B8] px-5 py-3 font-semibold md:text-2xl">{tag}</li>
    {/each}
  </ul>

  <div class="flex justify-center">
    <img
      src="/hello/share-content.png"
      alt="Evnly app sharing experience"
      width="4139"
      height="2530"
      class="block w-[140%] max-w-none md:w-full md:max-w-4xl"
      style="aspect-ratio: 4139 / 2530"
    />
  </div>
</section>
