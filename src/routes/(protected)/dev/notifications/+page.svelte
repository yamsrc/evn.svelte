<script lang="ts">
  import { ok } from 'svas'
  import { Section, Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { expenses } from '@/expenses'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { Notifications } from '@/notifications/ui'
  import type { Expense } from '@/expenses'
  import type { Notification } from '@/notifications'

  const VERSION = 1
  const MAX_IDENTITIES = 3

  function create<
    D extends Notification['domain'],
    E extends Extract<Notification, { domain: D }>['event'],
    N extends Extract<Notification, { domain: D; event: E }>,
    P extends N['payload'],
  >(id: string, identity: string, domain: D, event: E, key: string, payload?: P): N {
    const base = {
      id,
      identity,
      domain,
      event,
      key,
      _created: Date.now(),
      _version: VERSION,
    }

    return (payload ? { ...base, payload } : base) as N
  }

  const baseNotifications = $derived.by(() => {
    const acc = $account
    const contactsList = $contacts
    const expensesList = $expenses
    const groupsList = $groups

    if (!ok(acc) || !ok(contactsList) || !ok(expensesList) || !ok(groupsList)) return []

    const contact = contactsList[0]
    const expense = expensesList[0]
    const group = groupsList[0]
    const result: Notification[] = []

    // Accounts: created
    result.unshift(create('1', acc.id, 'accounts', 'created', acc.id))

    // Accounts: unchained
    const unchainedKey = contact?.identity ?? acc.id

    result.unshift(create('2', acc.id, 'accounts', 'unchained', unchainedKey))

    // Groups: joined - single identity
    if (group && group.identities.length > 0)
      result.unshift(
        create('3', acc.id, 'groups', 'joined', group.id, {
          identities: [group.identities[0]],
        }),
      )

    // Groups: joined - multiple identities
    if (group)
      result.unshift(
        create('4', acc.id, 'groups', 'joined', group.id, {
          identities: group.identities.slice(0, MAX_IDENTITIES),
        }),
      )

    // Expenses
    if (expense) {
      const participants: Expense['participants'] = Object.fromEntries(
        Object.entries(expense.participants).map(([id, p]) => [id, { amount: p.amount }]),
      )

      const extras: Expense['extras'] = expense.extras.map((extra) => ({ amount: extra.amount }))

      result.unshift(
        create('5', acc.id, 'expenses', 'expense', expense.id, {
          title: expense.title ?? 'Sample Expense',
          location: expense.location,
          participants,
          extras,
        }),
      )

      result.unshift(
        create('6', acc.id, 'expenses', 'expense', expense.id, {
          title: 'Expense Without Location',
          participants,
          extras: [],
        }),
      )

      result.unshift(
        create('7', acc.id, 'expenses', 'expense', expense.id, {
          title: 'Simple Expense',
          participants,
          extras: [],
        }),
      )
    }

    // Contacts: transferred
    if (contact && ok(contact.account) && expense) {
      const transfer = (id: string, delta: number, balance: number) =>
        create(id, acc.id, 'contacts', 'transferred', contact.identity, {
          expense: expense.id,
          delta,
          balance,
        })

      result.unshift(transfer('8', 2500, contact.balance ?? 5000))
      result.unshift(transfer('9', -1500, contact.balance ?? -2000))
      result.unshift(transfer('10', 1000, 0))
    }

    return result
  })

  const dismissedIds = $state<Set<string>>(new Set())

  const notifications = $derived(baseNotifications.filter((n) => !dismissedIds.has(n.id)))

  const ondismiss = (id: string) => {
    dismissedIds.add(id)
  }

  const onclear = () => {
    for (const notification of notifications) dismissedIds.add(notification.id)
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>Notification Examples</Header.Title>
  </Header.Root>
  <p>To see notifications, you need to be logged in and have some contacts and expenses.</p>
</Section>

<Section class="px-0">
  <Notifications {notifications} limit={notifications.length} {ondismiss} {onclear} />
</Section>
