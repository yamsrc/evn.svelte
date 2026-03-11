<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/buttons'
  import { dict as common } from '$lib/intl'
  import { leave } from '@/adventures'
  import { Editor } from '@/adventures/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Header, Panel, Section } from '@/app/ui'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)

  let busy = $state(false)
  let quitting = $state(false)

  async function quit() {
    if (id === undefined) return

    quitting = true

    const result = await leave(id)

    quitting = false

    if (result instanceof Error) return

    await goto('/')
  }
</script>

<Section>
  {#if id === undefined}
    <Header.Root>
      <Header.Title>{$dict.editor.title}</Header.Title>
    </Header.Root>
  {:else}
    <Header.Root>
      <Header.Title>{$dict.editor.settings}</Header.Title>
      <Header.Actions>
        <Hold
          id="adventures-editor-quit-button"
          onclick={quit}
          variant="outline"
          size="icon"
          position="left"
          label={$common.groups.leave}
          disabled={busy || quitting}>
          <LogOut class="size-5 text-destructive" />
        </Hold>
      </Header.Actions>
    </Header.Root>
  {/if}
</Section>

<Section>
  <Panel>
    <p class="text-sm">{$dict.editor.info}</p>
  </Panel>
</Section>

<Editor.Edit {id} bind:value={ctx.value} bind:busy />
