<script lang="ts">
  import { Async, combined, ok } from 'svas'
  import { Loader } from '$com/loader'
  import { dict } from '$lib/intl/dev'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { accounts } from '@/accounts'
  import { Section, Header, Panel } from '@/app/ui'
  import { Graph } from '@/contacts/ui'
  import { groups, expose } from '@/groups'

  let selected = $state<string | undefined>(undefined)

  const all = $derived(ok($groups) ? $groups : [])
  const id = $derived(selected ?? all[0]?.id)
</script>

<Async store={groups}>
  {#snippet awaited()}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.components.graph.title}</Header.Title>
      </Header.Root>

      {#if all.length > 0}
        <Select type="single" value={id} onValueChange={(v) => (selected = v)}>
          <SelectTrigger class="w-full">
            {all.find((g) => g.id === id)?.name ?? '—'}
          </SelectTrigger>
          <SelectContent>
            {#each all as group (group.id)}
              <SelectItem value={group.id}>{group.name}</SelectItem>
            {/each}
          </SelectContent>
        </Select>
      {/if}
    </Section>

    {#if id}
      <Section>
        <Panel class="aspect-3/2" contentClass="flex items-center justify-center">
          {#await expose(id)}
            <Loader />
          {:then contacts}
            {#if !(contacts instanceof Error)}
              {@const ids = [...new Set(contacts.flatMap((c) => c.identities))]}
              <Async store={combined(...ids.map((id) => accounts.get(id)))}>
                {#snippet awaited(members)}
                  <Graph {contacts} accounts={members} />
                {/snippet}
              </Async>
            {/if}
          {/await}
        </Panel>
      </Section>
    {/if}
  {/snippet}
</Async>
