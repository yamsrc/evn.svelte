<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { buttonVariants } from '$ui/button'
  import * as DropdownMenu from '$ui/dropdown-menu'
  import { actions } from './Actions'
</script>

{#snippet separator(text: string)}
  <div class="flex items-center justify-stretch gap-1 h-5">
    <div class="bg-border my-1 h-px w-2"></div>
    <span class="text-xs text-muted-foreground">{text}</span>
    <div class="bg-border my-1 h-px w-full"></div>
  </div>
{/snippet}

<Actions>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class={cn(buttonVariants({ size: 'icon' }), 'size-12')}>
      <Plus class="size-5" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" sideOffset={8}>
      {#each actions($dict) as group (group.name)}
        <DropdownMenu.Group>
          <DropdownMenu.GroupHeading class="px-0">
            <DropdownMenu.Separator>
              {#snippet child()}
                {@render separator(group.name)}
              {/snippet}
            </DropdownMenu.Separator>
          </DropdownMenu.GroupHeading>
          {#each group.items as item (item.name)}
            <DropdownMenu.Item onSelect={item.onSelect}>
              <item.icon size={16} class="text-foreground" />
              {item.name}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Actions>
