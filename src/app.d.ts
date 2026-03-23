// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ParticipantsState } from '@/app/ui/participants'
import type { Value as ExpenseValue } from '@/expenses/ui/Editor/Context'

declare global {

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
      __replace?: true
    }

    // interface Platform {}
  }
}

export { }
