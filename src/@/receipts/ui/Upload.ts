import type { UploadProps } from '$com/upload'

export interface Props extends UploadProps {
  onstart?: () => void
}
