<script lang="ts">
  import Button from './Button.svelte'
  import type { Props } from './Authentication'

  const { account }: Props = $props()
</script>

<div class="flex gap-2">
  <Button idp="google" {account} />
  <Button idp="apple" {account} />
</div>
