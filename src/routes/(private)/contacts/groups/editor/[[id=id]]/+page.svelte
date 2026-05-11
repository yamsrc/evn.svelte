<script lang="ts">
  import { Async, ok } from 'svas'
  import { LogOut } from '@lucide/svelte'
  import { dict as groupsDict } from '@/groups/ui/intl'
  import { Editor } from '@/groups/ui'
  import { del, groups } from '@/groups'
  import { Header, Section } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { Return } from '$com/shell'
  import { back } from '$com/history'
  import { Hold } from '$com/buttons'
  import { page } from '$app/state'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
  let busy = $state(false)
  let quitting = $state(false)

  async function leave() {
    if (!id) return

    quitting = true

    const result = await del(id)

    quitting = false

    if (result instanceof Error) return

    await back('/contacts/')
  }
</script>

{#if id}
  <Return href="/contacts/groups/{id}/" />
{/if}

<Section>
  {#if id === undefined}
    <Header.Root>
      <Header.Title>{$dict.groups.create}</Header.Title>
    </Header.Root>
  {:else}
    <Header.Root>
      <Header.Title>{$groupsDict.editor.settings}</Header.Title>
      <Header.Actions>
        <Async store={groups}>
          {#snippet awaited(groups)}
            {#if ok(groups)}
              {@const group = groups.find((entry) => entry.id === id)}
              {#if group}
                <Hold
                  id="groups-editor-leave-button"
                  onclick={leave}
                  variant="outline"
                  size="icon"
                  position="left"
                  label={$dict.groups.leave}
                  disabled={busy || quitting}>
                  <LogOut class="size-5 text-destructive" />
                </Hold>
              {/if}
            {/if}
          {/snippet}
        </Async>
      </Header.Actions>
    </Header.Root>
  {/if}
</Section>

<Editor.Edit {id} bind:value={ctx.value} bind:busy />
