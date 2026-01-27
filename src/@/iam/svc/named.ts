import { account } from './store'

export async function named(): Promise<string> {
  const current = account.extract()

  if (current?.name !== undefined) return current.name

  return new Promise<string>((resolve) => {
    const unsubscribe = account.subscribe((acc) => {
      if (acc?.name !== undefined) {
        unsubscribe()
        resolve(acc.name)
      }
    })
  })
}
