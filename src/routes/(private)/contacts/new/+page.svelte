<script lang="ts">
  import { account } from '@/iam'
  import { Invite } from '@/contacts/ui'
  import { Section } from '@/app/ui'
</script>

{#if $account}
  <Section class="m-auto">
    <Invite id={$account.id} />
  </Section>
{/if}
