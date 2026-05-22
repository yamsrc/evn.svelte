<script lang="ts">
  import Smile from '@lucide/svelte/icons/smile'
  import ScanLine from '@lucide/svelte/icons/scan-line'
  import ListChecks from '@lucide/svelte/icons/list-checks'
  import BadgeCheck from '@lucide/svelte/icons/badge-check'

  const steps = [
    { src: '/hello/how-phone-1.png', label: 'Scan the Receipt', Icon: ScanLine },
    { src: '/hello/how-phone-2.png', label: 'Assign Items', Icon: ListChecks },
    { src: '/hello/how-phone-3.png', label: 'Select a Payer', Icon: Smile },
    { src: '/hello/how-phone-4.png', label: 'Done!', Icon: BadgeCheck },
  ]
</script>

<section id="how-it-works" class="max-w-7xl mx-auto bg-[#ECE0D4] text-neutral-900 rounded-3xl px-4 py-12 md:py-16 space-y-16 md:space-y-20">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <p class="text-xs font-medium tracking-widest uppercase text-primary">Easy Steps</p>
    <div role="heading" aria-level="2" class="text-4xl md:text-6xl font-bold leading-tight">How It Works</div>
    <p class="text-neutral-600 text-balance max-w-xl mx-auto">
      Just snap a photo, tap to assign who had what, and let Evnly do the rest. No calculations, no confusion — just a clear and fair split in seconds.
    </p>
  </div>

  <ol class="grid justify-around grid-cols-[repeat(2,minmax(0,260px))] lg:grid-cols-[repeat(4,minmax(0,260px))] gap-x-4 gap-y-8 md:gap-y-12">
    {#each steps as { src, label, Icon } (label)}
      <li class="flex flex-col items-center gap-8">
        <div class="w-full pt-[31%]">
          <div
            class="relative w-full aspect-1140/1648 rounded-3xl bg-cover bg-center"
            style="background-image: url('/hello/how-phone-bg.jpg')"
          >
            <img
              {src}
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
