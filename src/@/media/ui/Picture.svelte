<script lang="ts">
  import { url, type Props } from './Picture'

  let {
    ref = $bindable(),
    id,
    path = '/pictures/',
    alt,
    width,
    height,
    variant,
    format,
    class: classes,
    style,
    loading,
  }: Props = $props()
</script>

<img
  bind:this={ref}
  src={url({ id, path, variant, format })}
  alt={alt ?? id}
  {width}
  {height}
  class={classes}
  {style}
  {loading} />
