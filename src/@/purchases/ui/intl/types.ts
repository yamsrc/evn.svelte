/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = string

export type Dictionary = {
      paywall: {
        title: string
        offer: {
          headline: string
          promo: string
          cta: string
          disclaimer: string
          footnote: string
          trial: (value: any) => string
        }
        complete: {
          thanks: string
          avatarNote: string
          featuresNote: string
        }
        free: {
          cta: string
        }
      }
      products: {
        yearly: {
          title: string
          description: (value: any) => string
        }
        monthly: {
          title: string
          description: string
        }
      }
      permonth: (value: any) => string
      trial: (value: any) => string
    }
