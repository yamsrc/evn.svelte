import type { Picture } from '@/account/ui'
import type { ComponentProps } from 'svelte'

export type Props = Omit<ComponentProps<typeof Picture>, 'account'>
