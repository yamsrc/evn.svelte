import { derived } from 'svelte/store'
import { ok } from 'svas'
import { ChartPie, Coins, Component, Fan, ScanText, UserPlus } from '@lucide/svelte'
import { adventures } from '@/adventures'
import { dict } from '$lib/intl'
import type { Icon } from '@lucide/svelte'
import type { Adventure } from '@/adventures'
import type { ButtonProps } from '$ui/button'
import type { Dictionary } from '$lib/intl'

interface ActionItem extends ButtonProps {
  label: string
  Icon: typeof Icon
  layer?: string
}

type ActionGroup = {
  name: string
  items: ActionItem[]
  direction?: 'row' | 'col'
}

function addAdventureExpense(dict: Dictionary, adventure: Adventure): ActionItem {
  return {
    id: 'nav-actions-adventure-expense-button',
    label: adventure.title,
    Icon: Coins,
    href: `/adventures/${adventure.id}/expenses/editor/`,
  }
}

function addExpense(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-cheques-input-button',
    label: dict.actions.expenses.split,
    Icon: ChartPie,
    href: '/expenses/editor/',
  }
}

function addContact(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-contacts-new-button',
    label: dict.actions.contacts.contact,
    Icon: UserPlus,
    layer: 'contacts',
  }
}

function addContactGroup(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-contacts-groups-button',
    label: dict.actions.contacts.group,
    Icon: Component,
    href: '/contacts/groups/',
  }
}

function addAdventure(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-adventures-new-button',
    label: dict.actions.adventures.adventure,
    Icon: Fan,
    href: '/adventures/editor/',
  }
}

function addScan(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-scan-button',
    label: dict.actions.scan,
    Icon: ScanText,
    class: '[&_svg]:text-primary!',
  }
}

function latest(adventures: Adventure[]): Adventure | undefined {
  const active = adventures.filter((a) => !a.archived)

  return active.length > 0 ? active.reduce((a, b) => (a._created > b._created ? a : b)) : undefined
}

export const actions = derived([dict, adventures], ([$dict, $adventures]) => {
  const actions = [
    {
      name: $dict.actions.cheques.title,
      direction: 'col' as const,
      items: [addContact($dict), addContactGroup($dict), addAdventure($dict)],
    },
    {
      name: $dict.actions.contacts.title,
      direction: 'row' as const,
      items: [addExpense($dict), addScan($dict)],
    },
  ] satisfies ActionGroup[]

  const adventure = ok($adventures) ? latest($adventures) : undefined

  if (adventure !== undefined)
    actions.unshift({
      name: $dict.actions.adventures.adventure,
      direction: 'col' as const,
      items: [addAdventureExpense($dict, adventure)],
    })

  return actions
})
