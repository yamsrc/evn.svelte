export interface Echo {
  id: string
  roles: string[]

  name?: string
  birthdate?: string
  /** kg */
  weight?: number
  /** cm */
  height?: number

  goals?: Goal[]
  /** bitmask of weekdays */
  days?: number
  /** 0: never, 1: long time ago, 2: occasionally, 3: systematicaly, 4: master */
  shape?: number
}

type Goal = 'fat' | 'muscles' | 'run' | 'crossfit'

export const Days = {
  Monday: 1 << 0,
  Tuesday: 1 << 1,
  Wednesday: 1 << 2,
  Thursday: 1 << 3,
  Friday: 1 << 4,
  Saturday: 1 << 5,
  Sunday: 1 << 6,
} as const

export const Shape = {
  Never: 0,
  LongTimeAgo: 1,
  Occasionally: 2,
  Systematicaly: 3,
  Master: 4,
} as const
