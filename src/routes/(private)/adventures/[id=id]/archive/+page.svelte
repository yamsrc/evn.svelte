<script lang="ts">
  import { Archive as ArchiveIcon, Info } from '@lucide/svelte'
  import { ok, Async, combined } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/buttons'
  import { Loader } from '$com/loader'
  import { Actions, Return } from '$com/shell'
  import { accounts } from '@/accounts'
  import { adventures, archive, expose } from '@/adventures'
  import { dict } from '@/adventures/ui/intl'
  import { actionVariants, Section, Header, Panel, Toggle } from '@/app/ui'
  import { Graph } from '@/contacts/ui'
  import type { Adventure } from '@/adventures'

  const id = $derived(page.params.id) as string

  const adventure: Adventure | undefined = $derived(
    ok($adventures) ? $adventures.find((a) => a.id === id) : undefined,
  )

  let merge = $state(true)
  let busy = $state(false)

  async function submit() {
    if (!id || busy) return

    busy = true

    const result = await archive(id, merge)

    busy = false

    if (result instanceof Error) return

    goto(`/adventures/${id}/`)
  }
</script>

{#if adventure}
  <Section>
    <Header.Root>
      <Header.Title>
        {$dict.archive.header}
      </Header.Title>
    </Header.Root>
  </Section>

  <Section>
    <Panel class="aspect-3/2" contentClass="flex items-center justify-center">
      {#await expose(id)}
        <Loader />
      {:then contacts}
        {#if ok(contacts)}
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

  <Section>
    <Toggle id="archive-merge-switch" label={$dict.archive.merge.label} bind:checked={merge}>
      <p class="text-muted-foreground">{$dict.archive.merge.description}</p>
    </Toggle>
  </Section>

  <Section>
    <Panel>
      <div class="flex items-start gap-2">
        <Info class="size-5 shrink-0 text-muted-foreground" />
        <p class="text-sm">{$dict.archive.warning}</p>
      </div>
    </Panel>
  </Section>

  <Actions>
    <Hold
      onclick={submit}
      disabled={busy}
      label={$dict.archive.header}
      class={actionVariants({ variant: 'destructive' })}>
      <ArchiveIcon />
      <span class="sr-only">{$dict.finish.archive.button}</span>
    </Hold>
  </Actions>
{/if}

<Return href={`/adventures/editor/${id}/`} />
