<script lang="ts">
  import { url, sources, type Props } from './Picture'

  let {
    ref = $bindable(),
    id,
    path = '/pictures/',
    alt,
    width,
    height,
    variant,
    densities = [1, 2],
    format,
    class: classes,
    style,
    loading,
  }: Props = $props()
</script>

<img
  bind:this={ref}
  src={url({ id, path, variant, format })}
  srcset={variant ? sources({ id, path, variant, format }, densities) : undefined}
  alt={alt ?? id}
  {width}
  {height}
  class={classes}
  {style}
  {loading} />
