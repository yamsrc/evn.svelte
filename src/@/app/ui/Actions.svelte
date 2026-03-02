<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import * as ActionMenu from '$com/action-menu'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { actionVariants } from './Action'
  import { actions } from './Actions'
</script>

<Actions>
  <ActionMenu.Root>
    <ActionMenu.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </ActionMenu.Trigger>
    <ActionMenu.Content>
      {#each actions($dict) as group (group.name)}
        <ActionMenu.Separator>{group.name}</ActionMenu.Separator>
        <ActionMenu.Group direction={group.direction}>
          {#each group.items as item (item.name)}
            <ActionMenu.Item id={item.id} onclick={item.onSelect}>
              <item.icon size={16} class="text-foreground" />
              {item.name}
            </ActionMenu.Item>
          {/each}
        </ActionMenu.Group>
      {/each}
    </ActionMenu.Content>
  </ActionMenu.Root>
</Actions>
