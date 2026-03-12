<script lang="ts">
  import { writable } from 'svelte/store'
  import { Plus } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import * as Dropdown from '$com/dropdown'
  import { actions } from './Actions'
  import { actionVariants } from './Action'

  const active = writable(false)
</script>

<Actions {active}>
  <Dropdown.Root onopen={(o) => active.set(o)}>
    <Dropdown.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      {#each actions($dict) as group, index (group.name)}
        {#if index > 0}
          <Dropdown.Separator />
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
