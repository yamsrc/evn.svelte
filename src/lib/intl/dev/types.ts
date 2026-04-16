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
        graph: {
          title: string
        }
        receipts: {
          title: string
          upload: {
            label: string
          }
          progress: {
            uploading: {
              title: string
              comment: string
            }
            processing: {
              comment: string
              title: string
            }
            ready: {
              title: string
              comment: (value: any) => string
            }
          }
        }
        picture: {
          title: string
        }
        participants: {
          title: string
          managedContactsCreation: string
          shareUrl: string
        }
        fullscreen: {
          title: string
          attachment: string
          delete: string
        }
        invitation: {
          title: string
        }
      }
      transmission: {
        title: string
        permission: {
          request: string
          granted: string
          denied: string
          unsupported: string
        }
        ping: string
      }
      loading: {
        title: string
      }
      receipts: {
        upload: {

        }
        dropzone: {
          label: string
        }
      }
      actions: {
        continue: string
      }
      nav: {
        home: string
        components: string
        transmission: string
        app: string
      }
    }
