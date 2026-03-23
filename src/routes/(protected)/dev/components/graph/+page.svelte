<script lang="ts">
  import { Dices } from '@lucide/svelte'
  import { Async, combined } from 'svas'
  import { SvelteMap } from 'svelte/reactivity'
  import { replaceState } from '$app/navigation'
  import { page } from '$app/state'
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

  type Rng = () => number

  function mulberry32(seed: number): Rng {
    return () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0

      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)

      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }

  function shuffle<T>(arr: T[], rng: Rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))

      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  function pairs<T>(arr: T[]): [T, T][] {
    const result: [T, T][] = []

    for (let i = 0; i < arr.length; i++)
      for (let j = i + 1; j < arr.length; j++) result.push([arr[i], arr[j]])

    return result
  }

  function partition(total: number, maxSize: number, rng: Rng): number[][] {
    const groups: number[][] = []
    let cursor = 0

    while (cursor < total) {
      const size = Math.min(2 + Math.floor(rng() * (maxSize - 1)), total - cursor)

      groups.push(Array.from({ length: size }, (_, i) => cursor + i))
      cursor += size
    }

    return groups
  }

  function edgesForGroup(group: number[], rng: Rng): ContactLike[] {
    if (group.length < 2) return []

    const candidates = pairs(group)

    shuffle(candidates, rng)

    const degree = new SvelteMap<number, number>()
    const edges: ContactLike[] = []

    const inc = (n: number) => degree.set(n, (degree.get(n) ?? 0) + 1)

    for (const [a, b] of candidates.slice(0, 1 + Math.floor(rng() * candidates.length))) {
      if ((degree.get(a) ?? 0) >= MAX_DEGREE || (degree.get(b) ?? 0) >= MAX_DEGREE) continue

      inc(a)
      inc(b)

      const balance = (rng() > 0.5 ? 1 : -1) * (1 + Math.floor(rng() * 10000))

      edges.push({ identities: [`r-${a}`, `r-${b}`], balance })
    }

    return edges
  }

  function generate(rng: Rng): { contacts: ContactLike[]; accounts: AccountLike[] } {
    const count = 2 + Math.floor(rng() * 9)

    const accounts: AccountLike[] = Array.from({ length: count }, (_, i) => ({
      id: `r-${i}`,
      name: `P${i + 1}`,
      picture: '',
    }))

    return {
      contacts: partition(count, MAX_GROUP, rng).flatMap((g) => edgesForGroup(g, rng)),
      accounts,
    }
  }

  let isRandom = $state(false)
  let selected = $state<string | undefined>(undefined)
  let random = $state(generate(Math.random))

  function selectGroup(id: string | undefined) {
    if (!id) return

    selected = id
    isRandom = false
  }

  function generateWithSeed(seed: number) {
    random = generate(mulberry32(seed))

    console.debug('graph seed:', seed, $state.snapshot(random))
    isRandom = true
  }

  function roll() {
    const seed = Math.floor(Math.random() * 0xffffffff)

    generateWithSeed(seed)

    const url = new URL(page.url)

    url.searchParams.set('seed', String(seed))
    replaceState(url, {})
  }

  const initialSeed = parseInt(page.url.searchParams.get('seed') ?? '', 10)

  if (!Number.isNaN(initialSeed)) generateWithSeed(initialSeed)
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
