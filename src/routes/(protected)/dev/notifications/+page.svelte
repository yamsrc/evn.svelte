<script lang="ts">
  import { ok } from 'svas'
  import { Section, Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { expenses } from '@/expenses'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { Notifications } from '@/notifications/ui'
  import type { Notification } from '@/notifications'

  const VERSION = 1
  const SAMPLE_DELTA = 2500
  const SAMPLE_BALANCE = 5000
  const MAX_IDENTITIES = 3

  const create = (
    id: string,
    identity: string,
    domain: Notification['domain'],
    event: string,
    key: string,
    payload?: unknown,
  ): Notification => {
    const base = {
      id,
      identity,
      domain,
      event,
      key,
      _created: Date.now(),
      _version: VERSION,
    }

    return (payload ? { ...base, payload } : base) as Notification
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

    result.unshift(create('1', acc.id, 'accounts', 'created', acc.id))

    const unchainedKey = contact?.identity ?? acc.id

    result.unshift(create('2', acc.id, 'accounts', 'unchained', unchainedKey))

    if (group)
      result.unshift(
        create('3', acc.id, 'groups', 'joined', group.id, {
          identities: group.identities.slice(0, MAX_IDENTITIES),
        }),
      )

    if (expense) {
      const participants = Object.fromEntries(
        Object.entries(expense.participants).map(([id, p]) => [id, p.amount]),
      )

      const extras = Object.fromEntries(
        expense.extras.map((extra, i) => [`extra-${i}`, extra.amount]),
      )

      result.unshift(
        create('4', acc.id, 'expenses', 'expense', expense.id, {
          title: expense.title ?? 'Sample Expense',
          location: expense.location,
          participants,
          extras,
        }),
      )
    }

    if (contact && ok(contact.account))
      result.unshift(
        create('5', acc.id, 'contacts', 'transferred', contact.identity, {
          delta: SAMPLE_DELTA,
          balance: contact.balance ?? SAMPLE_BALANCE,
        }),
      )

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
  <Notifications {notifications} {ondismiss} {onclear} />
</Section>
