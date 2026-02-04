<script lang="ts">
  import { ok } from 'svas'
  import { dict } from '$lib/intl/dev'
  import { Section, Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { expenses } from '@/expenses'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { Notifications } from '@/notifications/ui'
  import { Scopes } from '@/transmission/ui'
  import type { Expense } from '@/expenses'
  import type { Notification, Of, PayloadOf } from '@/notifications'

  const VERSION = 1
  const MAX_IDENTITIES = 3

  function create<D extends Notification['domain'], E extends Of<D>['event']>(
    id: number | string,
    identity: string,
    domain: D,
    event: E,
    key: string,
    ...args: [PayloadOf<D, E>] extends [never] ? [] : [PayloadOf<D, E>]
  ): Of<D, E> {
    const base = { id, identity, domain, event, key, _created: Date.now(), _version: VERSION }
    const payload = args[0]

    return (payload ? { ...base, payload } : base) as Of<D, E>
  }

  const baseNotifications = $derived.by(() => {
    let i = 0
    const acc = $account
    const contactsList = $contacts
    const expensesList = $expenses
    const groupsList = $groups

    if (!ok(acc) || !ok(contactsList) || !ok(expensesList) || !ok(groupsList)) return []

    const contact = contactsList[0]
    const expense = expensesList[0]
    const group = groupsList.find((g) => g.identities.length > 2)
    const result: Notification[] = []

    // Accounts: created
    result.unshift(create(i++, acc.id, 'accounts', 'created', acc.id))

    // Contacts: connected
    if (contact) result.unshift(create(i++, acc.id, 'contacts', 'connected', contact.identity))

    // Accounts: unchained
    const unchainedKey = contact?.identity ?? acc.id

    result.unshift(create(i++, acc.id, 'contacts', 'unchained', unchainedKey))

    // Groups: me joined
    if (group) {
      result.unshift(
        create(i++, acc.id, 'groups', 'joined', group.id, {
          identities: [acc.id],
        }),
      )

      // Groups: others joined
      result.unshift(
        create(i++, acc.id, 'groups', 'joined', group.id, {
          identities: group.identities.filter((id) => id !== acc.id).slice(0, MAX_IDENTITIES),
        }),
      )

      // Groups: single joined
      result.unshift(
        create(i++, acc.id, 'groups', 'joined', group.id, {
          identities: group.identities.filter((id) => id !== acc.id).slice(0, 1),
        }),
      )
    }

    // Expenses
    if (expense) {
      const participants: Expense['participants'] = Object.fromEntries(
        Object.entries(expense.participants).map(([id, p]) => [
          id,
          { amount: p.amount, paid: p.paid },
        ]),
      )

      const extras: Expense['extras'] = expense.extras.map((extra) => ({ amount: extra.amount }))

      result.unshift(
        create(i++, acc.id, 'expenses', 'created', expense.id, {
          title: expense.title ?? 'Sample Expense',
          location: expense.location,
          participants,
          extras,
        }),
      )
    }

    // Contacts: transferred
    if (contact && ok(contact.account) && expense) {
      const transfer = (delta: number, balance: number) =>
        create(i++, acc.id, 'contacts', 'transferred', contact.identity, {
          expense: expense.id,
          delta,
          balance,
        })

      result.unshift(transfer(2500, 5000))
      result.unshift(transfer(-1500, -2000))
      result.unshift(transfer(1000, 0))
    }

    return result
  })

  // svelte-ignore state_referenced_locally
  let display = $state(baseNotifications.length)
  const dismissed = $state<Set<string>>(new Set())

  const filteredNotifications = $derived(baseNotifications.filter((n) => !dismissed.has(n.id)))
  const notifications = $derived(display === 0 ? [] : filteredNotifications.slice(-display))

  const ondismiss = (id: string) => {
    dismissed.add(id)
  }

  const onclear = () => {
    for (const notification of notifications) dismissed.add(notification.id)
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.notifications.title}</Header.Title>
  </Header.Root>
</Section>

<Section class="px-0 space-y-2">
  <div class="flex items-center gap-4 px-5 py-2">
    <label for="notification-count" class="text-sm text-muted-foreground">
      {$dict.components.notifications.display(notifications.length)}
    </label>
    <input
      id="notification-count"
      type="range"
      min="0"
      max={baseNotifications.length}
      bind:value={display}
      class="flex-1 h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary" />
  </div>
  <Notifications {notifications} max={notifications.length} {ondismiss} {onclear} />
</Section>

<Section>
  <Scopes />
</Section>
