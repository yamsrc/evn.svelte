<script lang="ts">
  import { writable } from 'svelte/store'
  import { ensure, ok } from 'svas'
  import { ChartPie, Component, FileChartPie, Plus, UserPlus } from '@lucide/svelte'
  import { Scan } from '@/receipts/ui'
  import { account } from '@/iam'
  import { templates, type Template } from '@/expenses.templates'
  import { dict as contactsDict } from '@/contacts/ui/intl'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { QR } from '$com/qr'
  import * as Dropdown from '$com/dropdown'
  import { Share } from '$com/buttons'
  import { goto } from '$app/navigation'
  import { actionVariants } from './Action'
  import type { Props } from './Actions'

  const { showContacts = true }: Props = $props()

  const active = writable(false)
  const variant = [Dropdown.itemVariants({ direction: 'row' }), 'whitespace-nowrap']

  let dropdown = $state<Dropdown.Root | undefined>()

  function data(close = true) {
    const me = ensure(account)

    if (close) dropdown?.close()

    return { url: `${window.location.origin}/join/friends/${me.id}/` }
  }

  function text() {
    return data(false).url
  }

  function copy(template: Template) {
    const { id, ...rest } = template

    void goto('/expenses/editor/', {
      state: { expense: { ...rest, copied: id } },
    })
  }
</script>

<Actions {active}>
  <Dropdown.Root bind:this={dropdown} onopen={(o) => active.set(o)}>
    <Dropdown.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Layer>
        {#if ok($templates) && $templates.length > 0}
          <Dropdown.Group direction="col">
            {#each $templates as template (template.id)}
              <Dropdown.Item onclick={() => copy(template)}>
                <FileChartPie />
                {template.title}
              </Dropdown.Item>
            {/each}
          </Dropdown.Group>
          <Dropdown.Separator />
        {/if}

        {#if showContacts}
          <Dropdown.Group direction="col">
            <Dropdown.Item id="nav-actions-contacts-new-button" layer="contacts">
              <UserPlus />
              {$dict.actions.contacts.contact}
            </Dropdown.Item>
            <Dropdown.Item id="nav-actions-contacts-groups-button" href="/contacts/groups/editor/">
              <Component />
              {$dict.actions.contacts.group}
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
        {/if}

        <Dropdown.Group direction="row">
          <Dropdown.Item id="nav-actions-cheques-input-button" href="/expenses/editor/">
            <ChartPie />
            {$dict.actions.expenses.split}
          </Dropdown.Item>
          <Scan
            variant="ghost"
            class={[Dropdown.itemVariants({ direction: 'row' }), '[&_svg]:text-primary!']}
            oncomplete={(id: string) => goto(`/receipts/${id}/`)} />
        </Dropdown.Group>
      </Dropdown.Layer>
      <Dropdown.Layer name="contacts">
        <Dropdown.Group direction="col">
          <Dropdown.Back />
          <Dropdown.Item id="contacts-invite-manual-button" href="/contacts/managed/">
            <UserPlus />
            <span class="whitespace-nowrap">{$contactsDict.invite.manually}</span>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group direction="row">
          <QR variant="ghost" class={variant} {text} label={$contactsDict.invite.qr} />
          <Share variant="ghost" class={variant} {data} label={$contactsDict.invite.link} />
        </Dropdown.Group>
      </Dropdown.Layer>
    </Dropdown.Content>
  </Dropdown.Root>
</Actions>
