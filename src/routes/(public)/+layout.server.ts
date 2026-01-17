import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'max-age=14400',
    vary: 'accept-language',
  })
}
