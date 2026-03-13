import type { Item } from '@/receipts'

export interface Unit {
  item: string
  display: string
  identities: string[]
  price: number
}

interface SingleUnitsGroup {
  id: string
  outcast: false
  units: Unit[]
}

interface MultiUnitGroup {
  id: string
  outcast: true
  units: Unit[]
}

export type Group = SingleUnitsGroup | MultiUnitGroup

export function group(items: Item[]): Group[] {
  const groups: Group[] = []

  let singles: SingleUnitsGroup | null = null

  for (const item of items) {
    const units = toUnits(item)

    if (units.length > 1) {
      singles = null // close current group
      groups.push({ id: id(), outcast: true, units })
    } else {
      if (singles === null) {
        singles = { id: id(), outcast: false, units: [] }
        groups.push(singles)
      }

      singles.units.push(units[0])
    }
  }

  return groups
}

function id(): string {
  return crypto.randomUUID().slice(0, 8)
}

function toUnits(item: Item): Unit[] {
  return item.claims.map((claim) => ({
    item: item.id,
    display: item.display,
    identities: claim,
    price: item.price,
  }))
}
