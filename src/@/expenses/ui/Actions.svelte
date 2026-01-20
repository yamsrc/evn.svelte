<script lang="ts">
  import { ScanLine, PencilLine } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Button } from '$ui/button'
  import * as ButtonGroup from '$ui/button-group'
</script>

<Actions>
  <ButtonGroup.Root>
    <Button id="nav-action-scan" size="icon-lg">
      <ScanLine class="size-5" />
    </Button>
    <Button id="nav-action-input" href="/expenses/editor/participants/" size="icon-lg">
      <PencilLine class="size-5" />
    </Button>
  </ButtonGroup.Root>
</Actions>
