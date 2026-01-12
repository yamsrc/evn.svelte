<script lang="ts">
  import { ShieldCheck, ShieldOff } from '@lucide/svelte'
  import { apple } from '$lib/tools/mq'
  import { cn } from '$lib/utils'
  import * as Alert from '$ui/alert'
  import * as Card from '$ui/card'
  import { dict } from '@/iam/ui/intl'
  import { supported } from '@/passkeys'
  import Create from './Create.svelte'
  import Login from './Login.svelte'
  import type { Props } from './Authentication'

  const { class: classes, account }: Props = $props()

  const href = apple
    ? 'https://support.apple.com/en-us/102195'
    : 'https://support.google.com/accounts/answer/13548313'
</script>

{#snippet description()}
  <p>
    {$dict.auth.passkeysDescription}
    <a {href} target="_blank" class="text-nowrap">
      {$dict.auth.learnMore}
    </a>
  </p>
{/snippet}

<div class="space-y-4">
  <Card.Root class={cn('gap-4 bg-background/75', supported && 'pt-4', classes)}>
    {#if supported}
      <Card.Header class="gap-0">
        <Card.Title>{$dict.auth.signupTitle}</Card.Title>
      </Card.Header>
      <Card.Content>
        <Create {account} />
      </Card.Content>
    {/if}
    <Card.Footer>
      {#if supported}
        <Alert.Root>
          <ShieldCheck color="green" />
          <Alert.Title>{$dict.auth.betterSecurity}</Alert.Title>
          <Alert.Description>
            {@render description()}
          </Alert.Description>
        </Alert.Root>
      {:else}
        <Alert.Root>
          <ShieldOff color="red" class="animate-pulse" />
          <Alert.Title>{$dict.auth.passkeysNotSupported}</Alert.Title>
          <Alert.Description>
            <p>{$dict.auth.passkeysWarning}</p>
            {@render description()}
          </Alert.Description>
        </Alert.Root>
      {/if}
    </Card.Footer>
  </Card.Root>

  {#if supported && !account}
    <Login />
  {/if}
</div>
