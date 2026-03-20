<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { Async, ok } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/buttons'
  import { Return } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { expenses } from '@/expenses'
  import { Toggle as Favorite } from '@/favorites/ui'
  import { groups, del } from '@/groups'
  import { Editor, Expenses } from '@/groups/ui'
  import { seen } from '@/notifications'

  const ctx = Editor.getContext()
  const id = $derived(page.params.id)
  let busy = $state(false)

  const group = $derived(ok($groups) ? $groups.find((g) => g.id === id) : undefined)

  $effect(() => {
    if (id) void seen('groups', id)
  })

  async function leave() {
    if (!id) return

    del(id)

    goto('/contacts/')
  }
</script>

{#if id}
  <Return href="/contacts/" />
{/if}

<Section>
  {#if id === undefined}
    <Header.Root>
      <Header.Title>{$dict.groups.title}</Header.Title>
    </Header.Root>
  {:else}
    <Header.Root>
      <Header.Title>{$dict.groups.title}</Header.Title>
      <Header.Actions>
        <Favorite {id} type="group" />
        <Hold
          onclick={leave}
          variant="outline"
          size="icon"
          position="left"
          label={$dict.groups.leave}
          disabled={!group}>
          <LogOut class="size-5 text-destructive" />
        </Hold>
      </Header.Actions>
    </Header.Root>
  {/if}
</Section>

<Editor.Edit bind:value={ctx.value} bind:busy />

{#if id}
  <Async store={expenses}>
    {#snippet awaited(expenses)}
      <Section>
        <Expenses identities={ctx.value.identities} {expenses} />
      </Section>
    {/snippet}
  </Async>
{/if}
