/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = string

export type Dictionary = {
      recent: {
        title: string
        empty: string
      }
      payer: {
        placeholder: string
      }
      participants: {
        tabs: {
          sums: string
          shares: string
        }
        add: {
          label: string
        }
      }
      transfer: {
        action: string
        dialog: {
          title: string
          cancel: string
          action: string
        }
        me: string
        direction: {
          byme: (value: any) => string
          tome: (value: any) => string
        }
      }
      transfers: {
        tobe: {
          neutral: string
          positive: string
          negative: string
        }
        done: {
          paid: (value: any) => string
          received: (value: any) => string
        }
      }
      action: {

      }
      actions: {
        delete: string
      }
      template: {
        toggle: {
          label: string
          description: string
        }
      }
    }
