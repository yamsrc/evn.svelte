<script lang="ts">
  import { imageSet } from '$lib/tools/image'
  import { grammar } from '$lib/intl'
  import { dict } from '../intl'

  const avatars = ['review-1_zj3gih', 'review-2_ijxdol', 'review-3_ucldoy']
  const reviewKeys = ['one', 'two', 'three'] as const

  const reviews = $derived.by(() =>
    reviewKeys.map((key, i) => ({
      avatar: avatars[i],
      ...$dict.reviews[key],
    })),
  )

  const quotes = imageSet({
    '1x': '/assets/w_1200/reviews-quotes_zcdxaq.webp',
    '2x': '/assets/w_2400/reviews-quotes_zcdxaq.webp',
  })
</script>

<section id="reviews" class="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
  <div
    class="py-12 md:py-20 space-y-10 md:space-y-12 bg-no-repeat bg-center bg-contain"
    style="background-image: {quotes}">
    <div class="text-center">
      <p class="text-xs font-medium tracking-widest uppercase text-primary">{$dict.reviews.eyebrow}</p>
      <div role="heading" aria-level="2" class="mt-3 text-4xl md:text-6xl font-bold leading-tight text-white">
        {$dict.reviews.title}
      </div>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
    {#each reviews as { avatar, name, location, title, body } (name)}
      <li class="flex flex-col gap-4">
        <div role="heading" aria-level="3" class="text-xl md:text-2xl font-bold text-primary">
          {title}
        </div>
        <p class="text-balance">{body}</p>
        <div class="mt-auto flex items-center gap-4 pt-4">
          <div class="rounded-full border-2 border-primary p-1.5">
            <img
              src={`/assets/w_64/${avatar}.webp`}
              srcset={`/assets/w_64/${avatar}.webp 1x, /assets/w_128/${avatar}.webp 2x`}
              alt=""
              aria-hidden="true"
              width="64"
              height="64"
              class="block size-[61px] rounded-full object-cover" />
          </div>
          <div class="text-sm">{$dict.reviews.attribution(name, location, $grammar)}</div>
        </div>
      </li>
    {/each}
    </ul>
  </div>
</section>
