<script lang="ts">
  import { Dices } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { SvelteMap } from 'svelte/reactivity'
  import { Loader } from '$com/loader'
  import { dict } from '$lib/intl/dev'
  import { Button } from '$ui/button'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { accounts } from '@/accounts'
  import { Section, Header, Panel } from '@/app/ui'
  import { Graph } from '@/contacts/ui'
  import { groups, expose } from '@/groups'
  import type { AccountLike, ContactLike } from '@/contacts/ui/graph/Graph'

  const MAX_GROUP = 8
  const MAX_DEGREE = 4

  const randomInt = (n: number) => Math.floor(Math.random() * n)
  const randomBalance = () => (Math.random() > 0.5 ? 1 : -1) * (1 + randomInt(10000))

  let isRandom = $state(false)
  let selected = $state<string | undefined>(undefined)
  let random = $state(generate())

  function selectGroup(id: string | undefined) {
    if (!id) return

    selected = id
    isRandom = false
  }

  function roll() {
    random = generate()
    isRandom = true
  }

  function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randomInt(i + 1)

      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  function pairs<T>(arr: T[]): [T, T][] {
    const result: [T, T][] = []

    for (let i = 0; i < arr.length; i++)
      for (let j = i + 1; j < arr.length; j++) result.push([arr[i], arr[j]])

    return result
  }

  function partition(total: number, maxSize: number): number[][] {
    const groups: number[][] = []
    let cursor = 0

    while (cursor < total) {
      const size = Math.min(2 + randomInt(maxSize - 1), total - cursor)

      groups.push(Array.from({ length: size }, (_, i) => cursor + i))
      cursor += size
    }

    return groups
  }

  function edgesForGroup(group: number[]): ContactLike[] {
    if (group.length < 2) return []

    const candidates = pairs(group)

    shuffle(candidates)

    const degree = new SvelteMap<number, number>()
    const edges: ContactLike[] = []

    for (const [a, b] of candidates.slice(0, 1 + randomInt(candidates.length))) {
      if ((degree.get(a) ?? 0) >= MAX_DEGREE || (degree.get(b) ?? 0) >= MAX_DEGREE) continue

      degree.set(a, (degree.get(a) ?? 0) + 1)
      degree.set(b, (degree.get(b) ?? 0) + 1)
      edges.push({ identities: [`r-${a}`, `r-${b}`], balance: randomBalance() })
    }

    return edges
  }

  function generate(): { contacts: ContactLike[]; accounts: AccountLike[] } {
    const count = 2 + randomInt(9)

    const accounts: AccountLike[] = Array.from({ length: count }, (_, i) => ({
      id: `r-${i}`,
      name: `P${i + 1}`,
      picture: '',
    }))

    return { contacts: partition(count, MAX_GROUP).flatMap(edgesForGroup), accounts }
  }
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const groupId = selected ?? groups[0]?.id}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.components.graph.title}</Header.Title>
      </Header.Root>

      <div class="flex items-center gap-2">
        {#if groups.length > 0}
          <div class="flex-1">
            <Select type="single" value={groupId} onValueChange={selectGroup}>
              <SelectTrigger class="w-full">
                {groups.find((g) => g.id === groupId)?.name ?? '—'}
              </SelectTrigger>
              <SelectContent>
                {#each groups as group (group.id)}
                  <SelectItem value={group.id}>{group.name}</SelectItem>
                {/each}
              </SelectContent>
            </Select>
          </div>
        {/if}
        <Button variant="outline" size="icon" onclick={roll}>
          <Dices class="size-4" />
        </Button>
      </div>
    </Section>

    <Section>
      <Panel class="aspect-square p-0" contentClass="flex items-center justify-center p-0">
        {#if isRandom}
          <Graph contacts={random.contacts} accounts={random.accounts} />
        {:else if groupId}
          {#await expose(groupId)}
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
        {/if}
      </Panel>
    </Section>
  {/snippet}
</Async>
