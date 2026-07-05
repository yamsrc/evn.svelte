<script lang="ts">
  import Download from '@lucide/svelte/icons/download'
  import { ArrowRight, Globe } from '@lucide/svelte'
  import { cloudinary } from '@/media/ui'
  import { track } from '@/ga'
  import { Button } from '$ui/button'
  import { stores } from '$config/configuration'
  import { dict } from '../intl'
</script>

<section class="max-w-7xl mx-auto relative">
  <div id="download" class="absolute -top-18"></div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 *:min-h-0">
    <div
      class="bg-neutral-900 rounded-3xl md:aspect-square p-6 lg:p-16 flex flex-col gap-3 md:gap-4">
      <div
        class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Download class="size-5 lg:size-6" />
      </div>
      <div
        role="heading"
        aria-level="2"
        class="text-4xl md:text-6xl font-bold leading-tight text-white">
        {$dict.download.mobile.title1}
        <br />
        {$dict.download.mobile.title2}
      </div>
      <p class="text-balance">
        {$dict.download.mobile.body}
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a
          href={stores.appStore}
          target="_blank"
          rel="noopener"
          aria-label={$dict.download.mobile.appStoreAria}
          onclick={() => track('hello.cta', { name: 'app-store' })}>
          <img
            src={cloudinary('w_200', 'download-appstore_ie2u5h.webp')}
            srcset={`${cloudinary('w_200', 'download-appstore_ie2u5h.webp')} 1x, ${cloudinary('w_400', 'download-appstore_ie2u5h.webp')} 2x`}
            alt={$dict.download.mobile.appStoreAlt}
            width="45"
            height="13"
            class="block h-12 lg:h-14 w-auto" />
        </a>
        <a
          href={stores.googlePlay}
          target="_blank"
          rel="noopener"
          aria-label={$dict.download.mobile.googlePlayAria}
          onclick={() => track('hello.cta', { name: 'google-play' })}>
          <img
            src={cloudinary('w_200', 'download-googleplay_wubfdm.webp')}
            srcset={`${cloudinary('w_200', 'download-googleplay_wubfdm.webp')} 1x, ${cloudinary('w_400', 'download-googleplay_wubfdm.webp')} 2x`}
            alt={$dict.download.mobile.googlePlayAlt}
            width="45"
            height="13"
            class="block h-12 lg:h-14 w-auto" />
        </a>
      </div>
    </div>
    <div class="bg-neutral-900 rounded-3xl aspect-square p-6 lg:p-16 flex flex-col gap-3 md:gap-4">
      <div
        class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Globe class="size-5 lg:size-6" />
      </div>

      <div
        role="heading"
        aria-level="2"
        class="text-4xl md:text-6xl font-bold leading-tight text-white">
        {$dict.download.browser.title1}
        <br />
        {$dict.download.browser.title2}
      </div>

      <Button
        href="/"
        size="lg"
        onclick={() => track('hello.cta', { name: 'browser' })}
        class="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
        evnly.com
        <ArrowRight class="size-4" />
      </Button>
    </div>
  </div>
</section>
