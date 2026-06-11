import { available, request } from './transport'

export const shell = {
  available,

  purchases: {
    async available(): Promise<boolean | Error> {
      const r = await request('purchases.available')

      if (r instanceof Error) return r

      return r === true
    },
  },
}
