<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/hold'
  import Section from '$com/section/Section.svelte'
  import { Back } from '$lib/components/history'
  import { dict } from '$lib/intl'
  import { groups, del } from '@/groups'
  import { Name } from '@/groups/ui'

  const id = $derived(page.params.id)

  function created(id: string) {
    goto(`/contacts/groups/${id}`)
  }

  async function leave() {
    if (!id) return

    del(id)

    goto('/contacts/')
  }
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const group = groups.find((group) => group.id === id)}
    <Section class="flex flex-col gap-6 pt-2">
      <header class="flex justify-between items-center relative">
        <Back href="/contacts/">{$dict.contacts.title}</Back>
        <Hold
          onclick={leave}
          variant="ghost"
          class="size-12 bg-accent/50 border border-border"
          position="left"
          label={$dict.groups.leave}
          disabled={!group}
        >
          <LogOut class="size-5" />
        </Hold>
      </header>
    </Section>

    <Section>
      <Name id={group?.id} name={group?.name} oncreated={created} />
    </Section>
  {/snippet}
</Async>
