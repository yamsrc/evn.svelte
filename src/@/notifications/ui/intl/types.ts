/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

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
      erase: (value: any) => string
    }
