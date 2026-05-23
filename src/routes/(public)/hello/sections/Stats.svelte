<script lang="ts">
</script>

{#snippet stat(title: string, description: string)}
  <div class="space-y-2">
    <h2 class="whitespace-nowrap text-5xl!">{title}</h2>
    <p class="text-balance">{description}</p>
  </div>
{/snippet}

<div class="max-w-7xl mx-auto bg-primary text-primary-foreground rounded-3xl px-8 py-8 md:py-10">
  <p class="text-center text-xs font-medium tracking-widest uppercase opacity-80 mb-6">
    Shared expenses without the mess
  </p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center hello-stats">
    {@render stat('Scan receipts', 'Split items right on the photo')}
    {@render stat('Groups & trips', 'Keep every expense in one place')}
    {@render stat('Clear balances', 'Always know who owes whom')}
  </div>
</div>
