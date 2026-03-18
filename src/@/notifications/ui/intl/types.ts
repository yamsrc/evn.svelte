/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Dictionary = {
      groups: {
        joined: {
          me: (value: any) => string
          others: (...args: [any, any]) => string
          other: (...args: [any, any, any]) => string
        }
      }
      accounts: {
        created: {
          welcome: string
          hint: string
        }
      }
      erase: string
      contacts: {
        connected: (value: any) => string
        unchained: (...args: [any, any]) => string
        transferred: {
          paid: (...args: [any, any, any]) => string
          received: (...args: [any, any, any]) => string
          balance: {
            even: string
            owed: (value: any) => string
            owe: (value: any) => string
          }
        }
      }
      expenses: {
        expense: (value: any) => string
      }
      adventures: {
        joined: {
          me: (...args: [any, any]) => string
          other: (...args: [any, any, any]) => string
          others: (...args: [any, any, any]) => string
        }
        expense: {
          title: (...args: [any, any]) => string
          body: (value: any) => string
        }
      }
    }
