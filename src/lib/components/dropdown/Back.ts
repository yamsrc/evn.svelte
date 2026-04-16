import type { Props as ItemProps } from './Item'

export interface Props extends Omit<ItemProps, 'onclick' | 'screen'> {}
