<script lang="ts">
  import { Panel } from '@/groups/ui'
  import { dict } from './intl'
  import type { Props } from './Groups'

  const { contact, groups }: Props = $props()

  const belongs = $derived(groups.filter((group) => group.identities.includes(contact.identity)))
</script>

<div class="space-y-2">
  <h2>{$dict.groups.title}</h2>
  {#if belongs.length === 0}
    <p class="text-muted-foreground">{$dict.groups.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each belongs as group (group.id)}
        <li>
          <Panel {group} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
