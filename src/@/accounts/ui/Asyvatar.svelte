<script lang="ts">
  import { Async } from 'svas'
  import { Avatar } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Spinner } from '$ui/spinner'
  import type { Props } from './Asyvatar'

  const { identity, ...rest }: Props = $props()
</script>

<Async store={accounts.get(identity)}>
  {#snippet awaited(account)}
    <Avatar {account} {...rest} />
  {/snippet}
  {#snippet waiting()}
    <Spinner />
  {/snippet}
</Async>
