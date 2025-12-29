import type { Picture } from '@/accounts/ui'
import type { ComponentProps } from 'svelte'

export type Props = Omit<ComponentProps<typeof Picture>, 'account'>
