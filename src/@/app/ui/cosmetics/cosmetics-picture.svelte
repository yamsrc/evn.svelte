<script lang="ts">
  import Picture from './Picture.svelte'
  import type { Props } from './Picture'

  let { id = $bindable(''), onchange }: Props = $props()
</script>

<div class="flex justify-center" data-slot="picture">
  <Picture bind:id {onchange} />
</div>
