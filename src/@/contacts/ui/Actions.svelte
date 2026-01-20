<script lang="ts">
  import { UserPlus, Users } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import * as ButtonGroup from '$ui/button-group'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <ButtonGroup.Root>
    <Action id="nav-action-group" href="/contacts/groups/" variant="secondary">
      <Users />
    </Action>
    <Action id="nav-action-contact" href="/contacts/new/">
      <UserPlus />
    </Action>
  </ButtonGroup.Root>
</Actions>
