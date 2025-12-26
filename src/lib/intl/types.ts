/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Dictionary = {
      native: string
      locale: string
      actions: {
        continue: string
        holdToLogout: string
        signout: string
        close: string
        cheques: {
          title: string
          scan: string
          input: string
        }
        contacts: {
          group: string
          title: string
          contact: string
        }
        addSelected: string
        cancel: string
        search: string
      }
      nav: {
        home: string
        evns: string
        profile: string
        contacts: string
      }
      terms: string
      privacy: string
      madeBy: string
      profile: {
        title: string
        language: {
          title: string
          description: string
        }
      }
      form: {
        enterName: string
      }
      copyright: string
      onboarding: {
        name: {
          title: string
          description: string
        }
      }
      contacts: {
        title: string
        empty: {
          title: string
          description: string
          invite: {
            share: string
            qr: string
          }
        }
        all: string
        contact: {
          owesYou: string
          youOwe: string
        }
        delete: {
          confirm: {
            title: string
            description: string
            confirm: string
          }
        }
      }
      join: {
        app: {
          description: string
        }
        inviter: {
          description: (value: any) => string
        }
        accept: string
      }
      groups: {
        leave: string
        name: {
          description: string
        }
        members: {
          title: string
          addMembers: string
          addMember: string
        }
        title: string
        summary: {
          balance: {
            from: (value: any) => string
            to: (value: any) => string
          }
        }
      }
      invite: {
        share: string
        qr: string
        invite: string
      }
    }
