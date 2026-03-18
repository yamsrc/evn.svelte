<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Return } from '$com/shell'
  import { Spinner } from '$ui/spinner'
  import { adventures } from '@/adventures'
  import { Selector } from '@/adventures/ui'
  import { ExpenseForm } from '@/adventures/ui'
  import { Header, Section } from '@/app/ui'
  import { attach } from '@/expenses'
  import { Attachments } from '@/expenses/ui'

  let id = $state(page.params.id as string)
  const eid = $derived(page.params.eid)

  let form = $state<ReturnType<typeof ExpenseForm.Form>>()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  async function upload(e: Event) {
    const target = e.target as HTMLInputElement

    if (target.files === null) return

    const files = Array.from(target.files)

    target.value = ''
    uploading = true

    const ids = await attach(files)

    uploading = false

    if (ids instanceof Error) return

    form?.attach(...ids)
  }
</script>

<Return href="/adventures/{id}/" />

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((a) => a.id === id)}
    {@const existing = eid ? adventure?.expenses.find((e) => e.id === eid) : undefined}
    {#if adventure}
      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
          <Header.Actions>
            <Header.Button id="adventures-expense-attach-button" onclick={() => input?.click()}>
              {#if uploading}
                <Spinner />
              {:else}
                <Paperclip />
              {/if}
            </Header.Button>
          </Header.Actions>
          <input
            type="file"
            accept="image/*"
            bind:this={input}
            onchange={upload}
            multiple
            class="hidden" />
        </Header.Root>
      </Section>

      {#if !eid}
        <Section>
          <Selector
            {id}
            draft={form?.draft() ?? { title: '', attachments: [] }}
            onchange={(v) => {
              id = v
            }} />
        </Section>
      {/if}

      <Attachments attachments={form?.draft()?.attachments ?? []} />

      {#if existing}
        {#key eid}
          <ExpenseForm.Form bind:this={form} {adventure} expense={existing} />
        {/key}
      {:else}
        {#key id}
          <ExpenseForm.Form bind:this={form} {adventure} expense={page.state.expense ?? {}} />
        {/key}
      {/if}
    {/if}
  {/snippet}
</Async>
