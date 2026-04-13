import { locales } from "./built"
import type { Locale } from "./types"
import { defaultLocale } from "$config/configuration"

/**
 * Check if a BCP 47 language code matches a language code in the list
 * 
 * @param code BCP 47 language code
 * @returns {boolean} True if the code is supported, otherwise false.
 */
function supported(code: string): boolean {
  return locales.some(locale => locale.startsWith(code))
}

/**
 * Find a first matching locale by a BCP 47 language code. 
 * Defaults to 'en-US' if no match is found.
 * 
 * @param code BCP 47 language code
 * @returns {Locale} A Locale type with the matched locale, or the default locale if no match is found.
 */
function resolveLocale(code: string): Locale {
  return locales.find(locale => locale.startsWith(code)) ?? defaultLocale
}

export { supported, resolveLocale }
