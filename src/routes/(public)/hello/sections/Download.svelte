<script lang="ts">
  import Download from '@lucide/svelte/icons/download'
  import { ArrowRight, Globe } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { stores } from '$config/configuration'
</script>

<section id="download" class="max-w-7xl mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 *:min-h-0">
    <div
      class="bg-neutral-900 rounded-3xl aspect-square p-6 lg:p-16 flex flex-col gap-3 md:gap-4 overflow-hidden">
      <div
        class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Download class="size-5 lg:size-6" />
      </div>
      <div
        role="heading"
        aria-level="2"
        class="text-4xl md:text-6xl font-bold leading-tight text-white">
        Download
        <br />
        the Mobile App
      </div>
      <p class="text-balance">
        Make sharing expenses feel effortless. Download Evnly and enjoy every moment without the
        math.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a
          href={stores.appStore}
          target="_blank"
          rel="noopener"
          aria-label="Download on the App Store">
          <img
            src="/assets/w_200/download-appstore_ie2u5h.webp"
            srcset="/assets/w_200/download-appstore_ie2u5h.webp 1x, /assets/w_400/download-appstore_ie2u5h.webp 2x"
            alt="Download on the App Store"
            width="45"
            height="13"
            class="block h-12 lg:h-14 w-auto" />
        </a>
        <a
          href={stores.googlePlay}
          target="_blank"
          rel="noopener"
          aria-label="Get it on Google Play">
          <img
            src="/assets/w_200/download-googleplay_wubfdm.webp"
            srcset="/assets/w_200/download-googleplay_wubfdm.webp 1x, /assets/w_400/download-googleplay_wubfdm.webp 2x"
            alt="Get it on Google Play"
            width="45"
            height="13"
            class="block h-12 lg:h-14 w-auto" />
        </a>
      </div>
    </div>
    <div
      class="bg-neutral-900 rounded-3xl aspect-square p-6 lg:p-16 flex flex-col gap-3 md:gap-4 overflow-hidden">
      <div
        class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Globe class="size-5 lg:size-6" />
      </div>

      <div
        role="heading"
        aria-level="2"
        class="text-4xl md:text-6xl font-bold leading-tight text-white">
        Or use
        <br />
        in the browser
      </div>

      <Button
        href="/"
        size="lg"
        class="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
        evnly.com
        <ArrowRight class="size-4" />
      </Button>
    </div>
  </div>
</section>
