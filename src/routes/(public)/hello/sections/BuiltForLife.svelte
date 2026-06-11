<script lang="ts">
  import { dict } from '../intl'

  const tagKeys = ['dinners', 'travel', 'apartments', 'nights', 'other'] as const

  const tags = $derived.by(() => tagKeys.map((key) => $dict.builtForLife.tags[key]))
</script>

<section class="max-w-7xl mx-auto bg-[#ECE0D4] text-neutral-900 rounded-3xl px-6 md:px-12 py-12 md:py-20 overflow-hidden space-y-4 md:space-y-8">
  <div class="text-center max-w-3xl mx-auto space-y-2">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">
      {$dict.builtForLife.eyebrow}
    </p>
    <div role="heading" aria-level="2" class="text-4xl md:text-6xl font-bold leading-tight text-black">
      {$dict.builtForLife.title}
    </div>
    <p class="text-neutral-600 text-balance">
      {$dict.builtForLife.body}
    </p>
  </div>

  <ul class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
    {#each tags as tag (tag)}
      <li class="rounded-2xl bg-[#D9C9B8] px-5 py-3 font-semibold md:text-2xl">{tag}</li>
    {/each}
  </ul>

  <div class="relative mx-auto w-[140%] max-w-none md:w-full md:max-w-4xl">
    <img
      src="/assets/w_1100/share-background_fpilp3.webp"
      srcset="/assets/w_1100/share-background_fpilp3.webp 1x, /assets/w_2200/share-background_fpilp3.webp 2x"
      alt=""
      aria-hidden="true"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none h-auto pointer-events-none select-none"
    />
    <img
      src="/assets/w_896/share-content_eag5jl.webp"
      srcset="/assets/w_896/share-content_eag5jl.webp 1x, /assets/w_1792/share-content_eag5jl.webp 2x"
      alt={$dict.builtForLife.shareAlt}
      width="896"
      height="548"
      class="relative block w-full h-auto"
    />
  </div>
</section>
