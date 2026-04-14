import type { Benefit } from './Benefit'

export interface Props {
  next: () => void
}

export const benefits: Benefit[] = [
  {
    id: 'scan',
    title: 'Bill scanning and recognition*',
    description: 'Much easier than counting who have eaten what and how much.',
    picture: 'scan_qxgr1k',
  },
  {
    id: 'background',
    title: 'Premium visual themes',
    description: 'See the Evnly in the colours of your choice.',
    picture: 'background_e0uzuu',
  },
  {
    id: 'profile',
    title: 'You, highlighted',
    description: 'Premium users are bragging with prominent avatars, not like the common rubble.',
    picture: 'profile_nqof2u',
  },
]
