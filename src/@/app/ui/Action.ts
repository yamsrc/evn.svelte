import { buttonVariants, type ButtonProps } from '$ui/button'
import type { ClassValue } from 'svelte/elements'

export type Props = ButtonProps

const base = 'flex-1 h-full aspect-square [&_span]:sr-only'

export function actionVariants(props?: Props): ClassValue {
  if (props === undefined)
    return [buttonVariants({ class: base })]

  const { class: classes, ...rest } = props

  return [buttonVariants({ class: base, ...rest }), classes]
}
