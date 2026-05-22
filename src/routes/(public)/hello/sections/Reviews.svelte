<script lang="ts">
  const reviews = [
    {
      avatar: '/hello/review-1.jpg',
      name: 'Sofía',
      location: 'Madrid',
      title: 'Love the Receipt Scan',
      body: 'Super simple and actually fun to use. Love the receipt scan — it saves so much time and avoids mistakes.',
    },
    {
      avatar: '/hello/review-2.jpg',
      name: 'Jake',
      location: 'Berlin',
      title: 'Perfect for Trips',
      body: 'We used it every single day, and it made everything so much easier — no tracking expenses in notes or arguing about money.',
    },
    {
      avatar: '/hello/review-3.jpg',
      name: 'Emma',
      location: 'London',
      title: 'Just Scan!',
      body: 'Finally, no more "who owes me?" messages after dinner. We just scan the receipt and it’s all settled in seconds.',
    },
  ]
</script>

<section id="reviews" class="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
  <div
    class="py-12 md:py-20 space-y-10 md:space-y-12 bg-[url('/hello/reviews-quotes.png')] bg-no-repeat bg-center bg-contain">
    <div class="text-center">
      <p class="text-xs font-medium tracking-widest uppercase text-primary">What People Say</p>
      <div role="heading" aria-level="2" class="mt-3 text-4xl md:text-6xl font-bold leading-tight text-white">
        Reviews
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
              src={avatar}
              alt=""
              aria-hidden="true"
              width="244"
              height="244"
              class="block size-[61px] rounded-full object-cover" />
          </div>
          <div class="text-sm">— {name}, {location}</div>
        </div>
      </li>
    {/each}
    </ul>
  </div>
</section>
