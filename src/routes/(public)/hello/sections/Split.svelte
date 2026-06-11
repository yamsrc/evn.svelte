<script lang="ts">
  import { dict } from '../intl'
</script>

<div class="relative max-w-7xl mx-auto rounded-3xl px-8 py-12 md:py-16 overflow-hidden">
  <div class="relative text-center max-w-3xl mx-auto">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">{$dict.split.eyebrow}</p>
    <div role="heading" aria-level="2" class="mt-3 text-4xl md:text-6xl font-bold leading-tight text-white">
      {$dict.split.title}
    </div>
    <p class="mt-4 text-balance">
      {$dict.split.body}
    </p>
  </div>

  <div class="relative mt-10 md:mt-12 mx-auto w-full max-w-3xl">
    <img
      src="/assets/w_960/split-background_ffnpdz.webp"
      srcset="/assets/w_960/split-background_ffnpdz.webp 1x, /assets/w_1920/split-background_ffnpdz.webp 2x"
      alt=""
      aria-hidden="true"
      width="960"
      height="960"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none h-auto pointer-events-none select-none"
    />
    <img
      src="/assets/w_768/split-preview_m6mdae.webp"
      srcset="/assets/w_768/split-preview_m6mdae.webp 1x, /assets/w_1536/split-preview_m6mdae.webp 2x"
      alt={$dict.split.previewAlt}
      width="768"
      height="597"
      class="relative w-full h-auto block"
    />
  </div>
</div>
