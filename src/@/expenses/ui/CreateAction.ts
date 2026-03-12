import type { Props as ActionProps } from '@/app/ui/Action'
import type { Value } from './Editor'

export interface Props extends Omit<ActionProps, 'children' | 'value'> {
  value?: Partial<Value>
}
