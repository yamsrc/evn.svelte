<script lang="ts">
  import { dict } from '$lib/intl'
  import SeedMe from './seedme.svg'
</script>

<footer class="flex flex-col gap-3 p-6 text-muted-foreground text-sm">
  <a href="https://seed.me" target="_blank" class="flex justify-center gap-2">
    {$dict.madeBy}
    <img src={SeedMe} alt="seed.me" class="h-6" />
  </a>
  <!-- <div class="flex justify-center gap-2">
    <a href="/terms/">{$dict.terms}</a>
    &bull;
    <a href="/privacy/">{$dict.privacy}</a>
  </div> -->
</footer>
