<script lang="ts">
  import { UserPlus, Users } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import * as ButtonGroup from '$ui/button-group'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <ButtonGroup.Root>
    <Action id="nav-action-contact" href="/contacts/new/" variant="default">
      <UserPlus class="size-5" />
    </Action>
    <Action id="nav-action-group" href="/contacts/groups/">
      <Users class="size-5" />
    </Action>
  </ButtonGroup.Root>
</Actions>
