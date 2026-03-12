/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = string

export type Dictionary = {
      members: {
        title: string
        add: string
        empty: string
      }
      editor: {
        cover: string
        upload: string
        name: string
        note: string
        info: string
        settings: string
        title: string
      }
      finish: {
        archive: {
          title: string
          description: string
          button: string
        }
        delete: {
          title: string
          description: string
          button: (value: any) => string
        }
      }
      expenses: {
        title: string
        total: string
        paidBy: string
        paid: string
      }
      spending: {
        yours: string
        total: string
      }
      me: string
      selector: {
        regular: string
      }
      archive: {
        header: (...args: [any, any]) => string
        delete: {
          description: string
          button: string
        }
        warning: string
      }
      balance: {
        header: string
        merge: string
        keep: string
      }
      archived: string
    }
