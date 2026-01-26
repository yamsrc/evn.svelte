/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = 'he' | 'she' | 'none'

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
        save: string
        create: string
        slide: string
      }
      nav: {
        home: string
        profile: string
        contacts: string
        expenses: string
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
        grammar: {
          title: string
          description: string
          example: (...args: [any, any]) => string
        }
      }
      form: {
        enterName: string
      }
      copyright: (value: any) => string
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
            manual: string
          }
        }
        all: string
        contact: {
          owesYou: string
          youOwe: string
          even: string
        }
        delete: {
          confirm: {
            title: string
            description: string
            confirm: string
          }
        }
        add: {
          label: string
          description: string
        }
        share: {
          invite: {
            link: string
            qr: string
            description: string
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
          placeholder: string
        }
        members: {
          title: string
          addMembers: string
          addMember: string
          empty: string
        }
        title: string
        summary: {
          balance: {
            from: string
            to: string
            even: string
          }
        }
        create: string
      }
      invite: {
        share: string
        qr: string
        invite: string
      }
      etc: {
        or: string
      }
      account: {
        delete: {
          button: string
          title: string
          description: string
          sorry: string
          hold: string
          link: string
        }
      }
      favorites: {
        title: string
      }
      expenses: {
        spendings: {
          title: string
          total: string
          extras: {
            description: string
            title: string
          }
        }
        payers: {
          title: string
        }
        form: {
          title: {
            placeholder: string
          }
          location: {
            placeholder: string
          }
          save: string
        }
        title: string
        balance: {
          total: string
          youAreOwed: string
          youOwe: string
          youWillOwe: string
          youWillBeOwed: string
        }
        participants: {
          create: {
            title: string
          }
          title: string
          add: {

          }
        }
        me: string
        empty: {
          title: string
          description: string
          create: string
        }
      }
      home: {
        title: (value: any) => string
      }
      search: {
        empty: string
      }
    }
