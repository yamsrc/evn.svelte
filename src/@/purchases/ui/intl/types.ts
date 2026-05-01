/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Dictionary = {
      paywall: {
        title: string
        offer: {
          headline: string
          promo: string
          cta: string
          disclaimer: string
          footnote: string
          buy: string
          trial: {
            comment: (value: any) => string
            cta: string
          }
          subscribe_monthly: (value: any) => string
        }
        complete: {
          thanks: string
          avatarNote: string
          featuresNote: string
        }
        free: {
          cta: string
        }
        disclaimers: {
          apple: string
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
      disclaimers: {
        trial: string
        apple_account: string
        apple_yearly: (value: any) => string
        apple_manage: string
        apple_monthly: (value: any) => string
      }
      restore: {
        label: string
      }
    }
