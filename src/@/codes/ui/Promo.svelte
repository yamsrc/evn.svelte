<script lang="ts">
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import Apply from './Apply.svelte'

  let expanded = $state(false)
</script>

{#if expanded}
  <div class="bg-card rounded-lg border">
    <Apply oncomplete={() => (expanded = false)} />
  </div>
{:else}
  <Button id="codes-promo-button" variant="ghost" onclick={() => (expanded = true)}>
    {$dict.promo.label}
  </Button>
{/if}
