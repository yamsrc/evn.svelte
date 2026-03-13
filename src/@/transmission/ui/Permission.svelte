<script lang="ts">
  import { Hint } from '@/app/ui'
  import { permission, request } from '@/transmission'
  import { dict } from './intl'
  import type { Props } from './Permission'

  const { class: classes, name = 'transmission-permission', dismissable = false }: Props = $props()

  const DELAY = 7 * 24 * 60 * 60 * 1000

  function subscribe() {
    void request()
  }
</script>

{#if $permission === 'default'}
  <Hint.Root key="permission" delay={dismissable ? DELAY : undefined} {name} class={classes}>
    <Hint.Content>
      <p>{$dict.permission.prompt}</p>
      <p class="text-sm text-muted-foreground">{$dict.permission.comment}</p>
      <Hint.Actions>
        <Hint.Action onclick={subscribe}>{$dict.permission.button}</Hint.Action>
        {#if dismissable}
          <Hint.Later>{$dict.permission.later}</Hint.Later>
        {/if}
      </Hint.Actions>
    </Hint.Content>
    <Hint.Dismissing>
      <p>{$dict.permission.dismissed}</p>
      <Hint.Dismiss>{$dict.permission.dismiss}</Hint.Dismiss>
    </Hint.Dismissing>
  </Hint.Root>
{/if}
