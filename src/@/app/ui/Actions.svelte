<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import * as DropdownMenu from '$ui/dropdown-menu'
  import { actionVariants } from './Action'
  import { actions } from './Actions'
</script>

{#snippet separator(text: string)}
  <div class="flex items-center justify-stretch gap-1">
    <div class="bg-border my-1 h-px w-3.5"></div>
    <span class="text-muted-foreground">{text}</span>
    <div class="bg-border my-1 h-px w-full"></div>
  </div>
{/snippet}

<Actions>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content
      align="end"
      sideOffset={8}
      class="px-0.5 py-1 pt-2 data-[state=closed]:animate-none!">
      {#each actions($dict) as group (group.name)}
        <DropdownMenu.Group>
          <DropdownMenu.GroupHeading class="p-0 text-xs font-bold">
            <DropdownMenu.Separator>
              {#snippet child()}
                {@render separator(group.name)}
              {/snippet}
            </DropdownMenu.Separator>
          </DropdownMenu.GroupHeading>
          {#each group.items as item (item.name)}
            <DropdownMenu.Item
              id={item.id}
              onSelect={item.onSelect}
              class="text-base px-3.5 py-2.5">
              <item.icon size={16} class="text-foreground" />
              {item.name}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Actions>
