<script lang="ts">
  import { PencilLine } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import * as ButtonGroup from '$ui/button-group'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <ButtonGroup.Root>
    <Action id="nav-action-input" href="/expenses/editor/" variant="default">
      <PencilLine />
    </Action>
  </ButtonGroup.Root>
</Actions>
