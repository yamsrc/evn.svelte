<script lang="ts">
  import { url, srcSet, type Props } from './Picture'

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

  let loaded = $state(false)
</script>

<img
  bind:this={ref}
  src={url({ id, path, variant, format })}
  srcset={variant ? srcSet({ id, path, variant, format }, densities) : undefined}
  alt={alt ?? id}
  {width}
  {height}
  onload={() => (loaded = true)}
  class={[!loaded && 'bg-muted animate-pulse', classes]}
  {style}
  {loading} />
