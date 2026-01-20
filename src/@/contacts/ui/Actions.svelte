<script lang="ts">
  import { User, Users } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Button } from '$ui/button'
  import * as ButtonGroup from '$ui/button-group'
</script>

<Actions>
  <ButtonGroup.Root>
    <Button id="nav-action-contact" href="/contacts/new/" size="icon-lg">
      <User class="size-5" />
    </Button>
    <Button id="nav-action-group" href="/contacts/groups/" size="icon-lg">
      <Users class="size-5" />
    </Button>
  </ButtonGroup.Root>
</Actions>
