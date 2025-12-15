<script lang="ts">
  import { ShieldCheck, ShieldOff } from '@lucide/svelte'
  import { apple } from '$lib/tools/mq'
  import { cn } from '$lib/utils'
  import * as Alert from '$ui/alert'
  import * as Card from '$ui/card'
  import { supported } from '@/passkeys'
  import Create from './Create.svelte'
  import Login from './Login.svelte'

  const { class: classes }: { class?: string } = $props()
  const href = apple ? 'https://support.apple.com/en-us/102195' : 'https://support.google.com/accounts/answer/13548313'
</script>

<div class="space-y-4">
  <Card.Root class={cn('gap-4', supported && 'pt-4', classes)}>
    {#if supported}
      <Card.Header class="gap-0">
        <Card.Title>One-tap sign-up</Card.Title>
        <!-- <Card.Description>No passwords, no hassle</Card.Description> -->
      </Card.Header>
      <Card.Content>
          <Create />
      </Card.Content>
    {/if}
    <Card.Footer>
      {#if supported}
        <Alert.Root>
          <ShieldCheck color="green" />
          <Alert.Title>Better security</Alert.Title>
          <Alert.Description>
            <p>Passkeys are safer than passwords, easier to use, and can’t be stolen. <a {href} target="_blank">Learn more</a>.</p>
          </Alert.Description>
        </Alert.Root>
      {:else}
        <Alert.Root>
          <ShieldOff color="red" class="animate-pulse" />
          <Alert.Title>Passkeys not supported</Alert.Title>
          <Alert.Description>
            <p>
              Your browser does not respect your privacy and security.
            </p>
            <p>
              Passkeys are safer than passwords, easier to use, and can’t be stolen. <a {href} target="_blank" rel="noopener">Learn more</a>.
            </p>
          </Alert.Description>
        </Alert.Root>
      {/if}
    </Card.Footer>
  </Card.Root>

  {#if supported}
    <Login />
  {/if}
</div>
