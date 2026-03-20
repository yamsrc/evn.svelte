<script lang="ts">
  import { Fan } from '@lucide/svelte'
  import { Action } from '@/app/ui'
  import { Actions } from '$com/shell'
  import CreateAction from './CreateAction.svelte'
</script>

<Actions>
  <Action id="expenses-adventure-action" variant="secondary" href="/adventures/editor/">
    <Fan />
  </Action>
  <CreateAction />
</Actions>
