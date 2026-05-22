<script lang="ts">
  import Users from '@lucide/svelte/icons/users'
  import UserPlus from '@lucide/svelte/icons/user-plus'
  import Briefcase from '@lucide/svelte/icons/briefcase'

  const cards = [
    {
      id: 'simple-1_hplzge',
      Icon: Users,
      title: 'Create Groups\nfor Any Occasions',
      body: 'Whether it’s dinner with friends, a weekend trip, or shared household expenses, Evnly lets you create groups in seconds. Keep everyone organized, track who paid what, and make splitting simple for any occasion.',
      bg: 'bg-primary',
    },
    {
      id: 'simple-2_geqhs8',
      Icon: UserPlus,
      title: 'Add Friends Even\nif They’re Not on Evnly',
      body: 'No app? No problem. Invite anyone by link, and they can see their share instantly. Splitting bills has never been easier, even for friends who haven’t joined Evnly yet.',
      bg: 'bg-[#A33301]',
    },
    {
      id: 'simple-3_wkwxxl',
      Icon: Briefcase,
      title: 'Adventures',
      body: 'Adventures are for those who want to spend equally — be it a voyage together, a night out at the bar, or just shared household expenses. Evnly makes it effortless to track, split, and settle bills so everyone pays their fair share.',
      bg: 'bg-[#872301]',
    },
  ]
</script>

<section id="features" class="max-w-7xl mx-auto pt-20 space-y-6 md:space-y-10">
  <div class="text-center max-w-3xl mx-auto px-4">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">Splitting Made Simple</p>
    <div role="heading" aria-level="2" class="mt-3 text-4xl md:text-6xl font-bold leading-tight text-white">
      Everything You Need
      <br />
      to Split With Ease
    </div>
    <p class="mt-4 text-balance">
      Everything you need to split bills without stress. From quick receipt scanning to flexible
      group management, Evnly makes every step simple, fast, and clear — so you can focus on the
      moment, not the math.
    </p>
  </div>

  <ul class="space-y-4">
    {#each cards as { id, Icon, title, body, bg } (title)}
      <li class="grid grid-cols-1 md:grid-cols-2 gap-4 *:min-h-0">
        <div class={['rounded-3xl aspect-square p-6 lg:p-8', bg]}>
          <img
            src={`/assets/w_600/${id}.webp`}
            srcset={`/assets/w_600/${id}.webp 1x, /assets/w_1200/${id}.webp 2x`}
            alt=""
            aria-hidden="true"
            width="2189"
            height="2608"
            class="w-full h-full object-contain pointer-events-none select-none translate-y-[3%]" />
        </div>
        <div
          class="bg-[#ECE0D4] text-neutral-900 rounded-3xl aspect-square p-6 lg:p-16 flex flex-col justify-center gap-3 md:gap-4 overflow-hidden">
          <div
            class="flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon class="size-5 lg:size-6" />
          </div>
          <div
            role="heading"
            aria-level="3"
            class="text-2xl lg:text-4xl font-bold leading-tight whitespace-pre-line text-black">
            {title}
          </div>
          <p class="lg:text-base text-neutral-600 text-balance">{body}</p>
          <div>
            <a
              href="#download"
              class="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 font-medium hover:bg-neutral-900 hover:text-white transition-colors">
              Try It Now
            </a>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>
