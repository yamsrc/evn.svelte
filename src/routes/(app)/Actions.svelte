<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { Button } from '$ui/button'
</script>

<Actions>
  <Button size="icon" class="size-12">
    <Plus class="size-5" />
  </Button>
</Actions>
