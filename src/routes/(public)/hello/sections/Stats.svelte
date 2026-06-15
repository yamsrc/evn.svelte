<script lang="ts">
  import { dict } from '../intl'
</script>

{#snippet stat(title: string, description: string)}
  <div class="space-y-2">
    <h2 class="whitespace-nowrap text-5xl!">{title}</h2>
    <p class="text-balance">{description}</p>
  </div>
{/snippet}

<div class="max-w-7xl mx-auto bg-primary text-primary-foreground rounded-3xl px-8 py-8 md:py-10">
  <p class="text-center text-xs font-medium tracking-widest uppercase opacity-80 mb-6">
    {$dict.stats.eyebrow}
  </p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center hello-stats">
    {@render stat($dict.stats.scan.title, $dict.stats.scan.description)}
    {@render stat($dict.stats.groups.title, $dict.stats.groups.description)}
    {@render stat($dict.stats.balances.title, $dict.stats.balances.description)}
  </div>
</div>
