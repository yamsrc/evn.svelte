<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { track } from '@/ga'
  import { Button } from '$ui/button'
  import { dict } from '../intl'
</script>

<div class="relative max-w-7xl mx-auto bg-[#ECE0D4] rounded-3xl overflow-hidden">
  <img
    src="/hello/hero-background-grid.svg"
    alt=""
    aria-hidden="true"
    width="1408"
    height="979"
    class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
    style="mask-image: radial-gradient(ellipse 65% 55% at 50% 25%, #000 20%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 25%, #000 20%, transparent 100%);" />

  <div class="relative flex flex-col items-center text-center px-6 pt-16 md:px-12 md:pt-24">
    <div
      role="img"
      aria-label="Evnly"
      class="w-[70%] max-w-[560px] bg-[#56483C]"
      style="aspect-ratio: 130 / 50; mask-image: url('/evnly.svg'); mask-repeat: no-repeat; mask-size: contain; mask-position: center; -webkit-mask-image: url('/evnly.svg'); -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center;">
    </div>

    <p class="mt-6 text-3xl md:text-[40px] font-medium text-[#56483C] leading-tight">
      {$dict.hero.tagline1}
      <br />
      {$dict.hero.tagline2}
    </p>

    <Button
      href="/"
      size="lg"
      onclick={() => track('hello.cta', { name: 'start-splitting' })}
      class="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
      {$dict.hero.startSplitting}
      <ArrowRight class="size-4" />
    </Button>

    <img
      src="/assets/w_1024/hero-preview_kbf2qa.webp"
      srcset="/assets/w_1024/hero-preview_kbf2qa.webp 1x, /assets/w_2048/hero-preview_kbf2qa.webp 2x"
      alt={$dict.hero.previewAlt}
      width="1024"
      height="553"
      class="mt-10 w-[140%] max-w-none md:w-full md:max-w-5xl h-auto block" />
  </div>
</div>
