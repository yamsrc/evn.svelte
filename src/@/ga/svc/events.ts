import type { BenefitType } from '@/purchases/ui/Benefit'
import type { Method } from '@/iam'

export type PurchaseMethod = 'free' | 'ios'

export type HelloCta =
  | 'start-splitting'
  | 'install-app'
  | 'app-store'
  | 'google-play'
  | 'browser'
  | 'groups'
  | 'invite'
  | 'adventures'

export type EventMap = {
  /** User explores the app in demo mode without creating an account. */
  'accounts.demo': void

  /** New account registered. Fires once per signup, not on later logins. */
  'accounts.created': { method: Method }

  /** Existing user logged in. Fires on successful auth, not on session restore. */
  'accounts.authenticated': { method: Method }

  /** User added a new contact. */
  'contacts.created': void

  /** User created a group. */
  'groups.created': void

  /** User saved a new expense. */
  'expenses.created': void

  /** Expense was saved with a linked receipt. */
  'receipts.completed': void

  /** User uploaded a receipt image. */
  'receipts.upload': void

  /** Premium paywall was shown. `source` is the benefit that triggered it. */
  'purchases.paywall': { source: BenefitType }

  /** Premium purchase completed. `free` = timezone grant; `ios` = App Store purchase. */
  'purchases.completed': { method: PurchaseMethod }

  /** Landing page CTA click. */
  'hello.cta': { name: HelloCta }

  /** Push-notification permission denied. */
  'transmission.denied': { channel: string }

  /** Push-notification permission granted. */
  'transmission.granted': { channel: string }
}

export type EventName = keyof EventMap

type TrackArgs<E extends EventName> =
  EventMap[E] extends void ? [event: E] : [event: E, data: EventMap[E]]

export type { TrackArgs }
