<script lang="ts">
  import { UserPlus, Users } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Action } from '@/app/ui'
</script>

<Actions>
  <Action id="nav-action-group" href="/contacts/groups/" variant="secondary">
    <Users />
  </Action>
  <Action id="nav-action-contact" href="/contacts/new/">
    <UserPlus />
  </Action>
</Actions>
