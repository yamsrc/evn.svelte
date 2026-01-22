<script lang="ts">
  import { PencilLine } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <Action id="nav-action-input" href="/expenses/editor/" variant="default">
    <PencilLine />
  </Action>
</Actions>
