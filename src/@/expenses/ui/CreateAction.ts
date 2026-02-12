import type { Value } from './Editor'
import type { Props as ActionProps } from '@/app/ui/Action'

export interface Props extends Omit<ActionProps, 'children' | 'value'> {
  value?: Partial<Value>
}
