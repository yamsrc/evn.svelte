<script lang="ts">
  import { origin } from '$config'
  import type { Props } from './Pircure'

  let {
    ref = $bindable(),
    id,
    path = '/pictures/',
    alt,
    width,
    height,
    variant,
    format = 'webp',
    class: classes,
    style,
    loading,
  }: Props = $props()
</script>

<img
  bind:this={ref}
  src={`${origin}${path}${id}.${variant}.${format}`}
  alt={alt ?? id}
  {width}
  {height}
  class={classes}
  {style}
  {loading}
/>
