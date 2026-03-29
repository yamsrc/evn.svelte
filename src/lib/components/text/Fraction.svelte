<script lang="ts">
  import type { Props } from './Fraction'

  const { numerator, denominator, class: classes }: Props = $props()
  const known = $derived(numerator > 0 && numerator < denominator && denominator <= 8)
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if known}
  <span class={classes}>{@html `&frac${numerator}${denominator};`}</span>
{:else}
  <span class={['-space-x-0.5', classes]}>
    <sup>1</sup>
    <span>&frasl;</span>
    <sub>2</sub>
  </span>
{/if}
