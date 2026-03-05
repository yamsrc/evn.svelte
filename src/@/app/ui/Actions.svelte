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
      {#each actions($dict) as group, index (group.name)}
        {#if index > 0}
          <Dropdown.Separator></Dropdown.Separator>
        {/if}
        <Dropdown.Group direction={group.direction}>
          {#each group.items as item (item.name)}
            <Dropdown.Item id={item.id} onclick={item.onSelect}>
              <item.icon />
              {item.name}
            </Dropdown.Item>
          {/each}
        </Dropdown.Group>
      {/each}
    </Dropdown.Content>
  </Dropdown.Root>
</Actions>
