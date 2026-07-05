<script lang="ts">
  import Users from '@lucide/svelte/icons/users'
  import UserPlus from '@lucide/svelte/icons/user-plus'
  import Briefcase from '@lucide/svelte/icons/briefcase'
  import { cloudinary } from '@/media/ui'
  import { track, type HelloCta } from '@/ga'
  import { dict } from '../intl'

  const cardDefs: {
    id: string
    name: HelloCta
    key: 'groups' | 'invite' | 'adventures'
    Icon: typeof Users
    bg: string
  }[] = [
    {
      id: 'simple-1_hplzge',
      name: 'groups',
      key: 'groups',
      Icon: Users,
      bg: 'bg-primary',
    },
    {
      id: 'simple-2_geqhs8',
      name: 'invite',
      key: 'invite',
      Icon: UserPlus,
      bg: 'bg-[#A33301]',
    },
    {
      id: 'simple-3_wkwxxl',
      name: 'adventures',
      key: 'adventures',
      Icon: Briefcase,
      bg: 'bg-[#872301]',
    },
  ]

  const cards = $derived.by(() =>
    cardDefs.map(({ key, ...rest }) => ({
      ...rest,
      title: $dict.features.cards[key].title,
      body: $dict.features.cards[key].body,
    })),
  )
</script>

<section id="features" class="max-w-7xl mx-auto pt-20 space-y-6 md:space-y-10">
  <div class="text-center max-w-3xl mx-auto px-4">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">{$dict.features.eyebrow}</p>
    <div role="heading" aria-level="2" class="mt-3 text-4xl md:text-6xl font-bold leading-tight text-white">
      {$dict.features.title1}
      <br />
      {$dict.features.title2}
    </div>
    <p class="mt-4 text-balance">
      {$dict.features.body}
    </p>
  </div>

  <ul class="space-y-4">
    {#each cards as { id, name, Icon, title, body, bg } (name)}
      <li class="grid grid-cols-1 md:grid-cols-2 gap-4 *:min-h-0">
        <div class={['rounded-3xl aspect-square p-6 lg:p-8', bg]}>
          <img
            src={cloudinary('w_600', `${id}.webp`)}
            srcset={`${cloudinary('w_600', `${id}.webp`)} 1x, ${cloudinary('w_1200', `${id}.webp`)} 2x`}
            alt=""
            aria-hidden="true"
            width="600"
            height="715"
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
              onclick={() => track('hello.cta', { name })}
              class="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 font-medium hover:bg-neutral-900 hover:text-white transition-colors">
              {$dict.features.tryItNow}
            </a>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>
