/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = 'he' | 'she' | 'none'

export type Dictionary = {
  components: {
    title: string
    hold: {
      title: string
    }
    stack: {
      title: string
      collapse: string
    }
    notifications: {
      title: string
      display: (value: any) => string
    }
  }
  transmission: {
    title: string
    permission: {
      label: (value: any) => string
      request: string
    }
    ping: string
  }
}
