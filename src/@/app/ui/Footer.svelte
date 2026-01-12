<script lang="ts">
  import { dict } from '$lib/intl'
  import SeedMe from './seedme.svg'
</script>

<footer class="flex flex-col gap-3 p-5 text-muted-foreground text-sm">
  <div class="flex justify-center gap-2">
    {$dict.madeBy}
    <img src={SeedMe} alt="seed.me" class="h-6" />
  </div>
  <div class="flex justify-center gap-2">
    <a href="/terms/">{$dict.terms}</a>
    &bull;
    <a href="/privacy/">{$dict.privacy}</a>
  </div>
</footer>
