<script lang="ts">
  import { dict } from '@/iam/ui/intl'
  import * as Card from '$ui/card'
  import { cn } from '$lib/utils'
  import Form from './Form.svelte'
  import type { Props } from './Authentication'

  const { class: classes, account, oncreate }: Props = $props()
</script>

<Card.Root class={cn('pt-4 gap-4 bg-background/75', classes)}>
  <Card.Header class="gap-0">
    <Card.Title><h2>{$dict.auth.passwordTitle}</h2></Card.Title>
    <Card.Description>{$dict.auth.passwordDescription}</Card.Description>
  </Card.Header>
  <Card.Content>
    <Form {account} {oncreate} />
  </Card.Content>
</Card.Root>
