<script lang="ts">
  import { Panel } from '@/groups/ui'
  import { dict } from './intl'
  import type { Props } from './Groups'

  const { contact, groups }: Props = $props()

  const common = $derived(groups.filter((group) => group.identities.includes(contact.identity)))
</script>

<div class="space-y-2">
  <h2>{$dict.groups.title}</h2>
  {#if common.length === 0}
    <p class="text-muted-foreground">{$dict.groups.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each common as group (group.id)}
        <li>
          <Panel {group} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
