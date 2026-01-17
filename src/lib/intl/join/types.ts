/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Dictionary = {
      account: {
        title: string
        description: string
        accept: string
        content0: string
        content1: string
        conflict: {
          content0: (value: any) => string
          content1: string
        }
        switch: string
        expired: {
          content: string
          description: string
          title: string
        }
      }
      actions: {
        discard: string
        close: string
      }
      friends: {
        app: {
          description: string
        }
        inviter: {
          description: (value: any) => string
        }
        accept: string
        og: {
          description: string
          title: (value: any) => string
        }
        dialog: {
          title: string
          description: string
          accept: string
          decline: string
          content: (value: any) => string
        }
      }
    }
