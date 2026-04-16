<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl'
</script>

<div class="w-full flex flex-col items-center justify-center gap-2">
  <!-- <Button id="expenses-empty-scan-button" variant="secondary" size="lg" class="w-full">
    <ScanLine />
    {$dict.actions.cheques.scan}
  </Button>
  <Separator class="p-2 font-bold">{$dict.etc.or}</Separator> -->
  <Button id="expenses-empty-create-button" href="/expenses/editor/" size="lg" class="w-full">
    <Plus />
    {$dict.expenses.empty.create}
  </Button>
</div>
