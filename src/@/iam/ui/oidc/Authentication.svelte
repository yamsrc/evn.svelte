<script lang="ts">
  import Button from './Button.svelte'
  import type { Props } from './Authentication'

  const { account, apple = true, google = true, onauthenticate }: Props = $props()
</script>

<div class="flex gap-2">
  {#if google}
    <Button idp="google" {account} {onauthenticate} />
  {/if}
  {#if apple}
    <Button idp="apple" {account} {onauthenticate} />
  {/if}
</div>
