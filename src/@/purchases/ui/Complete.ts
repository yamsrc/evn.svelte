import { cloudinary } from '@/media/ui'
import type { CTA } from './store'
import type { image } from '$lib/tools'

export interface Props {
  cta: CTA | null
  next: () => void
}

export const assets: image.DensityMap = {
  '1x': cloudinary('w_630,h_450', 'confetti_iqzdvy.webp'),
  '2x': cloudinary('w_1260,h_900', 'confetti_iqzdvy.webp'),
}
