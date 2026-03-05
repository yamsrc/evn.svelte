<script lang="ts">
  import { CircleCheckBig } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Separator } from '$com/separator'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Action } from '@/app/ui'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { create } from '@/groups'
  import { Reduction } from '@/groups/ui'

  let reduction = $state(true)
  let name = $state('')
  let busy = $state(false)

  async function submit() {
    if (!name.trim()) return

    busy = true

    const group = await create({ name, reduction })

    busy = false

    if (group instanceof Error) return

    goto(`/contacts/groups/${group.id}`)
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.groups.title}</Header.Title>
  </Header.Root>
</Section>

<Section class="flex flex-col gap-2 space-y-4">
  <Cosmetics.Root class="w-full">
    <Cosmetics.Content class="items-stretch gap-2 w-full">
      <Cosmetics.Name class="w-full" bind:value={name} onchange={submit} autofocus />
      <Cosmetics.Note>{$dict.groups.name.description}</Cosmetics.Note>
    </Cosmetics.Content>
  </Cosmetics.Root>
</Section>

<Separator />

<Section>
  <Reduction bind:enabled={reduction} />
</Section>

<Actions>
  <Action id="nav-actions-groups-create-button" onclick={submit} disabled={busy || !name.trim()}>
    <CircleCheckBig />
  </Action>
</Actions>
