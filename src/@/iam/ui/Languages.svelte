<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { locale, selected, type Locale } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { options } from '@/account/ui/Language'

  let scrolling = false

  function click(event: MouseEvent, lang: Locale) {
    const target = event.currentTarget as HTMLButtonElement
    const offset = target.offsetLeft
    const scroll = target.parentElement!.scrollLeft
    const screen = target.parentElement!.clientWidth
    const width = target.clientWidth
    const off = screen / 2 - (offset - scroll)
    const center = scroll - off + width / 2

    scrolling = true
    setTimeout(() => (scrolling = false), 600)

    target.parentElement?.scrollTo({
      left: center,
      behavior: 'smooth',
    })

    selected.set(lang)
  }

  function onscroll(e: Event) {
    if (scrolling) return

    const target = e.target as HTMLDivElement
    const buttons = Array.from(target.querySelectorAll('button'))
    const center = target.clientWidth / 2

    const central = buttons.find(
      (button) =>
        button.offsetLeft - target.scrollLeft < center &&
        button.offsetLeft - target.scrollLeft + button.clientWidth > center,
    )

    if (!central) return

    selected.set(central.dataset.value as Locale)
  }

  const scroll = options.findIndex((option) => option.value === $locale)
</script>

<Scrollable infinite align="center" class="text-sm" dir="ltr" {onscroll} {scroll}>
  {#each options as option (option.value)}
    <button
      onclick={(e) => click(e, option.value)}
      class={cn(
        'snap-center px-2 py-1 text-muted-foreground transition-all',
        $locale === option.value && 'pointer-events-none text-foreground',
      )}
      data-value={option.value}
    >
      <span
        class={cn(
          'inline-block min-w-8',
          // option.value === 'ja-JP' && 'min-w-12',
          // option.value === 'ko-KR' && 'min-w-12',
        )}
      >
        {option.label}
      </span>
    </button>
  {/each}
</Scrollable>
