import { cn } from '$lib/utils'
import { buttonVariants, type ButtonProps } from '$ui/button'
import type { ClassValue } from 'tailwind-variants'
import type { ClassProp, VariantProps } from 'tailwind-variants'

export const defaults: ButtonProps = {
  class: 'flex-1 h-full aspect-square',
} as const

export type Props = ButtonProps

export const actionVariants = (
  props?: VariantProps<typeof buttonVariants> & ClassProp<ClassValue>,
) =>
  buttonVariants({
    ...defaults,
    ...props,
    class: cn(defaults.class, props?.class),
  } as Parameters<typeof buttonVariants>[0])
