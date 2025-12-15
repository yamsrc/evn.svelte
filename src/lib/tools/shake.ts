export async function shake(element: HTMLElement) {
  element.classList.add('animate-shake')

  await new Promise((resolve) => setTimeout(resolve, DURATION))

  element.classList.remove('animate-shake')
}

// should be in sync with `animation.shake` duration in `tailwind.config.ts`
const DURATION = 500
