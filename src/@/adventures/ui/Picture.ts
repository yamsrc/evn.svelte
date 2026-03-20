import type { ComponentProps } from 'svelte'
import type { Picture } from '@/media/ui'
import type { Adventure } from '@/adventures'

type AdventureLike = Pick<Adventure, 'title' | 'picture'>

export interface Props extends Omit<ComponentProps<typeof Picture>, 'id' | 'alt' | 'variant'> {
  adventure: AdventureLike
}
