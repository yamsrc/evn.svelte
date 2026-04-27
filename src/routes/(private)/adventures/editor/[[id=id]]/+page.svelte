<script lang="ts">
  import { Async } from 'svas'
  import { LogOut, Trash2 } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Header, Section, Hint } from '@/app/ui'
  import { dict } from '@/adventures/ui/intl'
  import { Editor } from '@/adventures/ui'
  import { Archive } from '@/adventures/ui'
  import { leave, adventures } from '@/adventures'
  import { dict as common } from '$lib/intl'
  import { Return } from '$com/shell'
  import { Hold } from '$com/buttons'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

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

    await goto('/expenses/')
  }
</script>

{#if id}
  <Return href="/adventures/{id}/" />
{/if}

<Section>
  {#if id === undefined}
    <Header.Root>
      <Header.Title>{$dict.editor.title}</Header.Title>
    </Header.Root>
  {:else}
    <Header.Root>
      <Header.Title>{$dict.editor.settings}</Header.Title>
      <Header.Actions>
        <Async store={adventures}>
          {#snippet awaited(adventures)}
            {@const adventure = adventures.find((entry) => entry.id === id)}
            {@const originator = adventure?.originator === $account?.id}
            {#if adventure}
              <Hold
                id="adventures-editor-quit-button"
                onclick={quit}
                variant="outline"
                size="icon"
                position="left"
                duration={originator ? 3000 : 2000}
                label={originator ? $common.adventures.delete : $common.groups.leave}
                disabled={busy || quitting}>
                {#if originator}
                  <Trash2 class="size-5 text-destructive" />
                {:else}
                  <LogOut class="size-5 text-destructive" />
                {/if}
              </Hold>
            {/if}
          {/snippet}
        </Async>
      </Header.Actions>
    </Header.Root>
  {/if}
</Section>

{#if id === undefined}
  <Section>
    <Hint.Root key="adventures">
      <Hint.Content>
        <p>{$dict.editor.info}</p>
        <Hint.Actions>
          <Hint.Dismiss>
            {$dict.hint.dismiss}
          </Hint.Dismiss>
        </Hint.Actions>
      </Hint.Content>
    </Hint.Root>
  </Section>
{/if}

<Editor.Edit {id} bind:value={ctx.value} bind:busy />

{#if id !== undefined}
  <Async store={adventures}>
    {#snippet awaited(adventures)}
      {@const adventure = adventures.find((entry) => entry.id === id)}
      {#if adventure}
        <Section>
          <Archive {adventure} />
        </Section>
      {/if}
    {/snippet}
  </Async>
{/if}
