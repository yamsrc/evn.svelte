import type { Adventure } from '@/adventures'

type AdventureLike = Pick<Adventure, 'id' | 'title' | 'expenses'>

export interface Props {
  adventure: AdventureLike
}
