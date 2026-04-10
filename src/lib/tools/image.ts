export type DensityMap = Record<`${number}x`, string>

/**
 * Preload the best-matching image for current pixel density.
 *
 * Picks the smallest density `>=` `devicePixelRatio`, or the highest available.
 *
 * @param assets - {@link DensityMap}
 *
 * @example
 * ```ts
 * preload({ '1x': '/img/bg.webp', '2x': '/img/bg@2x.webp' })
 * ```
 */
export function preload(assets: DensityMap) {
  const densities = Object.keys(assets)
    .map((key) => parseFloat(key))
    .sort((a, b) => a - b)

  const match = densities.find((d) => d >= devicePixelRatio) ?? densities.at(-1)!

  new Image().src = assets[`${match}x`]
}

/**
 * Build a CSS `image-set()` value from a density map.
 *
 * @param assets - {@link DensityMap}
 * @returns CSS `image-set(…)` string for use in `background-image`.
 *
 * @example
 * ```ts
 * imageSet({ '1x': '/img/bg.webp', '2x': '/img/bg@2x.webp' })
 * // → "image-set(url('/img/bg.webp') 1x, url('/img/bg@2x.webp') 2x)"
 * ```
 */
export function imageSet(assets: DensityMap) {
  return `image-set(${Object.entries(assets).map(([density, url]) => `url('${url}') ${density}`).join(', ')})`
}
