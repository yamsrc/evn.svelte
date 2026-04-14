import type { Props as PickerProps } from '$com/picker/Root'

export interface Props extends Omit<PickerProps, 'onpick' | 'bleed'> {
  onpick?: PickerProps['onpick']
}
