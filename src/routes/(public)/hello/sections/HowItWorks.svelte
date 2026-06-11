<script lang="ts">
  import Smile from '@lucide/svelte/icons/smile'
  import ScanLine from '@lucide/svelte/icons/scan-line'
  import ListChecks from '@lucide/svelte/icons/list-checks'
  import BadgeCheck from '@lucide/svelte/icons/badge-check'
  import { imageSet } from '$lib/tools/image'
  import { dict } from '../intl'

  const stepDefs = [
    { id: 'how-phone-1_c5ynqv', Icon: ScanLine },
    { id: 'how-phone-2_rggglh', Icon: ListChecks },
    { id: 'how-phone-3_hqrmag', Icon: Smile },
    { id: 'how-phone-4_rwcooo', Icon: BadgeCheck },
  ]

  const steps = $derived.by(() => [
    { ...stepDefs[0], label: $dict.howItWorks.steps.scan },
    { ...stepDefs[1], label: $dict.howItWorks.steps.assign },
    { ...stepDefs[2], label: $dict.howItWorks.steps.payer },
    { ...stepDefs[3], label: $dict.howItWorks.steps.done },
  ])

  const bg = imageSet({
    '1x': '/assets/w_280/how-phone-bg_x2yejc.webp',
    '2x': '/assets/w_560/how-phone-bg_x2yejc.webp',
  })
</script>

<section id="how-it-works" class="max-w-7xl mx-auto bg-[#ECE0D4] text-neutral-900 rounded-3xl px-4 py-12 md:py-16 space-y-16 md:space-y-20">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">{$dict.howItWorks.eyebrow}</p>
    <div role="heading" aria-level="2" class="text-4xl md:text-6xl font-bold leading-tight text-black">
      {$dict.howItWorks.title}
    </div>
    <p class="text-neutral-600 text-balance max-w-xl mx-auto">
      {$dict.howItWorks.body}
    </p>
  </div>

  <ol class="grid justify-around grid-cols-[repeat(2,minmax(0,260px))] lg:grid-cols-[repeat(4,minmax(0,260px))] gap-x-4 gap-y-8 md:gap-y-12">
    {#each steps as { id, label, Icon } (label)}
      <li class="flex flex-col items-center gap-8">
        <div class="w-full pt-[31%]">
          <div
            class="relative w-full aspect-285/412 rounded-3xl bg-cover bg-center"
            style="background-image: {bg}"
          >
            <img
              src={`/assets/w_220/${id}.webp`}
              srcset={`/assets/w_220/${id}.webp 1x, /assets/w_440/${id}.webp 2x`}
              alt={label}
              class="absolute left-[10%] bottom-[6.92%] w-[80%] aspect-891/1840"
            />
            <div class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon class="size-5" />
            </div>
          </div>
        </div>
        <div class="text-center text-xl md:text-2xl font-semibold">{label}</div>
      </li>
    {/each}
  </ol>
</section>
