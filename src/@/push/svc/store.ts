import { value } from 'svas'
import { account } from '@/iam'

export const subscriptionIds = value<string[]>({
  persist: 'push:subscriptions',
  bind: account,
})

export function getSubscriptionIds(): string[] {
  const ids = subscriptionIds.extract()

  return ids ?? []
}

export function addSubscription(id: string): void {
  const ids = getSubscriptionIds()

  if (!ids.includes(id))
    subscriptionIds.set([...ids, id])
}

export function removeSubscription(id: string): void {
  const ids = getSubscriptionIds()

  subscriptionIds.set(ids.filter((i) => i !== id))
}

export function clearSubscriptions(): void {
  subscriptionIds.set([])
}
