<script lang="ts">
  import { options } from '@/accounts/ui/Language'
  import { locale, selected, type Locale } from '$lib/intl'
  import { Scrollable } from '$com/scrollable'
  import type { Props } from './Languages'

  const { onselect }: Props = $props()

  const SCROLL_ID = 'languages'

  let scrolling = false

  function centerOf(parent: HTMLElement, child: HTMLElement): number {
    return child.offsetLeft - parent.clientWidth / 2 + child.clientWidth / 2
  }

  /**
   * Safari fires scroll events during resize before snap recalculates,
   * causing onscroll to pick a wrong language. Re-center the current
   * locale button before scroll events fire (resize fires first per spec).
   */
  function onresize() {
    const el = document.getElementById(SCROLL_ID)

    if (!el) return

    const buttons = el.querySelectorAll<HTMLButtonElement>(`[data-value="${$locale}"]`)

    if (!buttons.length) return

    let closest: HTMLButtonElement = buttons[0]
    let min = Infinity

    for (const btn of buttons) {
      const dist = Math.abs(centerOf(el, btn) - el.scrollLeft)

      if (dist < min) {
        min = dist
        closest = btn
      }
    }

    el.scrollLeft = centerOf(el, closest)
  }

  function click(event: MouseEvent, lang: Locale) {
    const target = event.currentTarget as HTMLButtonElement
    const parent = target.parentElement!

    scrolling = true
    setTimeout(() => (scrolling = false), 600)

    parent.scrollTo({
      left: centerOf(parent, target),
      behavior: 'smooth',
    })

    select(lang)
  }

  function onscroll(e: Event) {
    if (scrolling) return

    const target = e.target as HTMLDivElement
    const center = target.clientWidth / 2

    const central = Array.from(target.querySelectorAll('button')).find(
      (button) =>
        button.offsetLeft - target.scrollLeft < center &&
        button.offsetLeft - target.scrollLeft + button.clientWidth > center,
    )

    if (!central) return

    const lang = central.dataset.value as Locale

    if (lang === $locale) return

    select(lang)
  }

  function select(lang: Locale) {
    selected.set(lang)
    onselect?.(lang)
  }

  const scroll = options.findIndex((option) => option.value === $locale)
</script>

<svelte:window {onresize} />

<Scrollable infinite align="center" class="text-sm" dir="ltr" {onscroll} {scroll} id={SCROLL_ID}>
  {#each options as option (option.value)}
    <button
      onclick={(e) => click(e, option.value)}
      class={[
        'snap-center px-2 py-1 text-muted-foreground transition-all',
        $locale === option.value && 'pointer-events-none text-foreground bg-muted rounded-md',
      ]}
      data-value={option.value}>
      <span
        class={[
          'inline-block min-w-8',
          (option.value === 'ja-JP' || option.value === 'ko-KR') && 'min-w-12',
        ]}>
        {option.label}
      </span>
    </button>
  {/each}
</Scrollable>
