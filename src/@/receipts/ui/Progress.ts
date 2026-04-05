import type { Progress } from '@/receipts'

export interface Props {
  file: File
  progress: Progress
  oncomplete?: (id: string) => void
  onretry?: () => void
  style?: string
}
