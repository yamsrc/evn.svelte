import { internal } from './store'

export function exclude(receiptId: string, extraId: string, value = false) {
  // const me = ensure(account)

  // optimistic
  internal.update(receiptId, (receipt) => {
    const index = receipt.extras.findIndex((e) => e.id === extraId)

    if (index === -1) throw new Error('Extra not found')

    // Rich, Rich...
    receipt.extras[index] = { ...receipt.extras[index], included: value }
    receipt.extras = [...receipt.extras]

    return receipt
  })

  // const receipt = await net.receipt.patch(me.id, id, { extras: extras.filter((e) => e.name !== extra.name) })

  // if (receipt instanceof Error) return receipt

  // sync(internal, receipt)
}

export function include(receiptId: string, extraId: string) {
  return exclude(receiptId, extraId, true)
}
