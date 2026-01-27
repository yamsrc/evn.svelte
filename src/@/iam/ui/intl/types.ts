/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Locale = 'ar-SA' | 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'sw-TZ' | 'tr-TR' | 'uk-UA' | 'zh-CN'

export type Grammar = 'he' | 'she' | 'none'

export type Dictionary = {
      auth: {
        welcomeBack: string
        signupTitle: string
        passwordTitle: string
        passwordDescription: string
        passkey: string
        email: string
        alreadyHaveAccount: string
        betterSecurity: string
        passkeysNotSupported: string
        passkeysWarning: string
        learnMore: string
        passwordBlank: string
        otpInstructions: string
        holdToLogout: string
        continueWith: (value: any) => string
        passkeysDescription: string
        yourName: string
        password: string
        refresh: {
          description: (value: any) => string
          title: string
        }
        signout: string
        login: string
        signin: string
        inApp: {
          title: string
          description: string
          continue: string
        }
      }
    }
