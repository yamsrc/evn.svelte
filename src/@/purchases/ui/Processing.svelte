<script lang="ts">
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { dict as common } from '$lib/intl'
  import { open } from './store'
  import { dict } from './intl'
</script>

<div id="purchases-processing" class="space-y-4">
  <div
    class="w-full aspect-7/5 border border-border rounded-lg flex flex-col items-center justify-center gap-3 bg-background">
    <Spinner class="size-10" />
    <p class="text-center text-lg font-bold max-w-2xs">{$dict.paywall.processing.title}</p>
  </div>
  <p class="text-center text-muted-foreground">{$dict.paywall.processing.note}</p>
  <Button onclick={() => open.set(false)} class="w-full" size="lg">
    {$common.actions.close}
  </Button>
</div>
