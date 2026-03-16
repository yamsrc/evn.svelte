import type { Adventure, Expense } from '@/adventures'

type AdventureLike = Pick<Adventure, 'id' | 'title'>

export interface Props {
  adventure: AdventureLike
  expense: Expense
}
