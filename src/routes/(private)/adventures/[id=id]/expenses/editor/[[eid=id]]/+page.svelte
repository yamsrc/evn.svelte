<script lang="ts">
  import { Async } from 'svas'
  import { Paperclip } from '@lucide/svelte'
  import { Header, Section } from '@/app/ui'
  import { Selector } from '@/adventures/ui'
  import { ExpenseForm } from '@/adventures/ui'
  import { adventures } from '@/adventures'
  import { Spinner } from '$ui/spinner'
  import { Return } from '$com/shell'
  import { page } from '$app/state'

  let id = $state(page.params.id as string)
  const eid = $derived(page.params.eid)

  let editor = $state<ReturnType<typeof ExpenseForm.Edit>>()
</script>

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((a) => a.id === id)}
    {@const existing = eid ? adventure?.expenses.find((e) => e.id === eid) : undefined}
    {@const expense = existing ?? page.state.expense ?? {}}
    {#if adventure}
      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
          <Header.Actions>
            <Header.Button id="adventures-expense-attach-button" onclick={() => editor?.attach()}>
              {#if editor?.uploading}
                <Spinner />
              {:else}
                <Paperclip />
              {/if}
            </Header.Button>
          </Header.Actions>
        </Header.Root>
      </Section>

      {#if !eid}
        <Section>
          <Selector
            {id}
            draft={editor?.form?.draft() ?? { title: '', attachments: [] }}
            onchange={(v) => {
              id = v
            }} />
        </Section>
      {/if}

      {#key `${id}-${eid}`}
        <ExpenseForm.Edit bind:this={editor} {adventure} {expense} />
        <Return href="/adventures/{id}/" />
      {/key}
    {/if}
  {/snippet}
</Async>
