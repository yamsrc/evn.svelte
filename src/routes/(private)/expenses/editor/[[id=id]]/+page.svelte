<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { page } from '$app/state'
  import { dict } from '$lib/intl'
  import { Spinner } from '$ui/spinner'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { attach } from '@/expenses'
  import { Editor } from '@/expenses/ui'
  import { seen } from '@/notifications'

  const id = $derived(page.params.id)
  const ctx = Editor.getContext()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  async function upload(e: Event) {
    const target = e.target as HTMLInputElement

    if (target.files === null) return

    const files = Array.from(target.files)

    target.value = ''
    uploading = true

    const ids = await attach(files, id)

    uploading = false

    if (ids instanceof Error) {
      console.error('Upload failed', ids)

      return
    }

    ctx.value.attachments.push(...ids)
  }

  $effect(() => {
    if (id) seen('expenses', id)
  })
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.expenses.title}</Header.Title>
    <Header.Actions>
      <Header.Button id="expenses-attach-button" onclick={() => input?.click()}>
        {#if uploading}
          <Spinner />
        {:else}
          <Paperclip />
        {/if}
      </Header.Button>
      <input
        type="file"
        accept="image/*"
        bind:this={input}
        onchange={upload}
        multiple
        class="hidden" />
    </Header.Actions>
  </Header.Root>
</Section>

<Editor.Edit {id} bind:value={ctx.value} bind:mode={ctx.mode} />
