<script lang="ts">
  import { Section } from '$com/section'
  import { Invite } from '@/contacts/ui'
  import { account } from '@/iam'
</script>

{#if $account}
  <Section class="m-auto">
    <Invite id={$account.id} />
  </Section>
{/if}
