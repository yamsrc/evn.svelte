import type { Option } from '$com/radio'
import type { Locale } from '$lib/intl'

const options: Option<Locale>[] = [
  { value: 'en-US', label: 'English' },
  // { value: 'ar-SA', label: 'العربية' },
  // { value: 'zh-CN', label: '中文' },
  // { value: 'de-DE', label: 'Deutsch' },
  // { value: 'es-ES', label: 'Español' },
  // { value: 'fr-FR', label: 'Français' },
  // { value: 'hi-IN', label: 'हिंदी' },
  // { value: 'it-IT', label: 'Italiano' },
  // { value: 'ja-JP', label: '日本語' },
  // { value: 'ko-KR', label: '한국어' },
  // { value: 'nl-NL', label: 'Nederlands' },
  // { value: 'ru-RU', label: 'Русский' },
  // { value: 'sw-TZ', label: 'Swahili' },
  // { value: 'tr-TR', label: 'Türkçe' },
  // { value: 'uk-UA', label: 'Українська' },
] as const

export { options }
