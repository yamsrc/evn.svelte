<script lang="ts">
  import { Fan } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Action } from '@/app/ui'
  import CreateAction from './CreateAction.svelte'
</script>

<Actions>
  <Action id="expenses-adventure-action" variant="secondary" href="/adventures/editor/">
    <Fan />
  </Action>
  <CreateAction />
</Actions>
