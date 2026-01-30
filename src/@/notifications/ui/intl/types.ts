/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = 'he' | 'she' | 'none'

export type Dictionary = {
      groups: {
        joined: {
          me: (value: any) => string
          others: (...args: [any, any]) => string
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
            owe: (...args: [any, any]) => string
          }
        }
      }
      expenses: {
        created: (value: any) => string
      }
    }
