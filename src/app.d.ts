// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Value as ExpenseValue } from '@/expenses/ui/Editor'
import type { ParticipantsState } from '@/app/ui/participants'

declare global {

  /** Extended per-domain via interface merging (e.g. transmission/fcm, purchases/apple). */
  interface WebkitMessageHandlers {}

  interface Window {
    webkit?: { messageHandlers?: WebkitMessageHandlers }
  }

  namespace App {
    // interface Error {}
    // interface Locals {}

    interface PageData {
      meta?: {
        title?: string
        description?: string
        image?: {
          url: string
          width: number
          height: number
          type: string
        }
      }
    }

    interface PageState {
      expense?: Partial<ExpenseValue>
      participants?: ParticipantsState
    }

    // interface Platform {}
  }

  namespace Intl {
    interface DurationFormatOptions {
      style?: 'long' | 'short' | 'narrow' | 'digital'
    }
    interface DurationFormat {
      format(duration: {
        years?: number
        months?: number
        weeks?: number
        days?: number
        hours?: number
        minutes?: number
        seconds?: number
        milliseconds?: number
        microseconds?: number
        nanoseconds?: number
      }): string
    }
    interface DurationFormatConstructor {
      new (locales?: string | string[], options?: DurationFormatOptions): DurationFormat
    }
    const DurationFormat: DurationFormatConstructor
  }
}

export { }
