<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$ui/button'
  import { inAppPopOut } from '$lib/tools'
  import { dict } from './intl'
  import Card from './Card.svelte'

  onMount(inAppPopOut)
</script>

<Card title={$dict.auth.inApp.title} description={$dict.auth.inApp.description}>
  {#snippet action()}
    <Button onclick={inAppPopOut}>{$dict.auth.inApp.continue}</Button>
  {/snippet}
</Card>
