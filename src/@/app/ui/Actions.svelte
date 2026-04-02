<script lang="ts">
  import { writable } from 'svelte/store'
  import { ensure } from 'svas'
  import { Plus, UserPlus } from '@lucide/svelte'
  import { account } from '@/iam'
  import { dict as contactsDict } from '@/contacts/ui/intl'
  import { Actions } from '$com/shell'
  import { QR } from '$com/qr'
  import * as Dropdown from '$com/dropdown'
  import { Share } from '$com/buttons'
  import { actions } from './Actions'
  import { actionVariants } from './Action'

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
</script>

<Actions {active}>
  <Dropdown.Root bind:this={dropdown} onopen={(o) => active.set(o)}>
    <Dropdown.Trigger id="nav-actions-button" class={actionVariants()}>
      <Plus />
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Layer>
        {#each $actions as group, index (group.name)}
          {#if index > 0}
            <Dropdown.Separator />
          {/if}
          <Dropdown.Group direction={group.direction}>
            {#each group.items as { label, Icon, ...props } (props.id)}
              <Dropdown.Item {...props}>
                <Icon />
                {label}
              </Dropdown.Item>
            {/each}
          </Dropdown.Group>
        {/each}
      </Dropdown.Layer>
      <Dropdown.Layer name="contacts">
        <Dropdown.Group direction="col">
          <Dropdown.Back />
          <Dropdown.Item href="/contacts/managed/">
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
