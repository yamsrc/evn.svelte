import { buttonVariants, type ButtonProps } from '$ui/button'
import type { ClassNameValue } from 'tailwind-merge'
import type { ClassProp, VariantProps } from 'tailwind-variants'

export const defaults = {
  size: 'icon-lg',
} as const

export type Props = ButtonProps

export const actionVariants = (
  props?: VariantProps<typeof buttonVariants> & ClassProp<ClassNameValue>,
) => buttonVariants({ ...defaults, ...props })
