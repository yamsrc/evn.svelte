<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import * as Dropdown from '$com/dropdown'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { actionVariants } from './Action'
  import { actions } from './Actions'
</script>

<Actions>
  <Dropdown.Root>
    <Dropdown.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      {#each actions($dict) as group (group.name)}
        <Dropdown.Separator>{group.name}</Dropdown.Separator>
        <Dropdown.Group direction={group.direction}>
          {#each group.items as item (item.name)}
            <Dropdown.Item id={item.id} onclick={item.onSelect}>
              <item.icon size={16} />
              {item.name}
            </Dropdown.Item>
          {/each}
        </Dropdown.Group>
      {/each}
    </Dropdown.Content>
  </Dropdown.Root>
</Actions>
