<script lang="ts">
  import { ScanLine, PencilLine } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import * as ButtonGroup from '$ui/button-group'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <ButtonGroup.Root>
    <Action id="nav-action-scan" variant="default">
      <ScanLine class="size-5" />
    </Action>
    <Action id="nav-action-input" href="/expenses/editor/">
      <PencilLine class="size-5" />
    </Action>
  </ButtonGroup.Root>
</Actions>
