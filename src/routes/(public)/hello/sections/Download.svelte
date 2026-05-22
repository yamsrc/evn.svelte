<script lang="ts">
  import Download from '@lucide/svelte/icons/download'
  import { stores } from '$config/configuration'
</script>

<section id="download" class="max-w-7xl mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 *:min-h-0">
    <div class="rounded-3xl aspect-square bg-neutral-900 p-6 lg:p-8 overflow-hidden">
      <img
        src="/hello/download-qr.png"
        alt="Scan to download Evnly"
        width="2464"
        height="1920"
        class="w-full h-full object-contain pointer-events-none select-none" />
    </div>

    <div
      class="bg-neutral-900 rounded-3xl aspect-square p-6 lg:p-16 flex flex-col justify-center gap-3 md:gap-4 overflow-hidden">
      <div
        class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Download class="size-5 lg:size-6" />
      </div>
      <div
        role="heading"
        aria-level="2"
        class="text-4xl md:text-6xl font-bold leading-tight text-white">
        Download<br />the Mobile App
      </div>
      <p class="text-balance">
        Make sharing expenses feel effortless. Download Evnly and enjoy every moment without the
        math.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a href={stores.appStore} target="_blank" rel="noopener" aria-label="Download on the App Store">
          <img
            src="/hello/download-appstore.png"
            alt="Download on the App Store"
            width="720"
            height="208"
            class="block h-12 lg:h-14 w-auto"
            style="aspect-ratio: 720 / 208" />
        </a>
        <a href={stores.googlePlay} target="_blank" rel="noopener" aria-label="Get it on Google Play">
          <img
            src="/hello/download-googleplay.png"
            alt="Get it on Google Play"
            width="720"
            height="208"
            class="block h-12 lg:h-14 w-auto"
            style="aspect-ratio: 720 / 208" />
        </a>
      </div>
    </div>
  </div>
</section>
