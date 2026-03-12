<script lang="ts">
  import { UserPlus, Users } from '@lucide/svelte'
  import { Action } from '@/app/ui'
  import { Actions } from '$com/shell'
</script>

<Actions>
  <Action id="nav-action-group" href="/contacts/groups/" variant="secondary">
    <Users />
  </Action>
  <Action id="nav-action-contact" href="/contacts/new/">
    <UserPlus />
  </Action>
</Actions>
