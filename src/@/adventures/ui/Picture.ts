import type { Adventure } from '@/adventures'
import type { Picture } from '@/media/ui'
import type { ComponentProps } from 'svelte'

type AdventureLike = Pick<Adventure, 'title' | 'picture'>

export interface Props extends Omit<ComponentProps<typeof Picture>, 'id' | 'alt' | 'variant'> {
  adventure: AdventureLike
}
