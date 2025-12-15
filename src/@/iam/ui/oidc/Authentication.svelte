<script lang="ts">
  import { apple } from '$lib/tools'
  import Button from './Button.svelte'
</script>

<div class="flex gap-2">
  <Button idp="google" />
  {#if apple}
    <Button idp="apple" />
  {/if}
</div>
