import type { PageServerLoad } from './$types'

const meta = {
  title: 'Evnly: split shared expenses',
  description:
    'Split receipts and shared expenses in seconds. Scan bills, assign items, and settle up with friends on trips, dinners, and household costs.',
  keywords:
    'expense splitting, split bills, shared expenses, receipt scanner, bill splitting app, group expenses, trip splitting, roommate expenses, split check, Evnly',
  image: {
    url: '/og/app.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpg',
  },
} satisfies App.PageData['meta']

export const load: PageServerLoad = ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=3600',
  })

  return { meta }
}
