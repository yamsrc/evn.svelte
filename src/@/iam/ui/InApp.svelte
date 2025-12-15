<script lang="ts">
  import { onMount } from 'svelte'
  import { inAppPopOut } from '$lib/tools'
  import { Button } from '$ui/button'
  import Card from './Card.svelte'
  import { dict } from './intl'

  onMount(inAppPopOut)
</script>

<Card title={$dict.auth.inApp.title} description={$dict.auth.inApp.description}>
  {#snippet action()}
    <Button onclick={inAppPopOut}>{$dict.auth.inApp.continue}</Button>
  {/snippet}
</Card>
