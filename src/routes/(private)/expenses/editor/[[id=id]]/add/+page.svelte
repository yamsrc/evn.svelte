<script lang="ts">
  import { Participants } from '@/app/ui'
  import { dict } from '$lib/intl'
</script>

<Participants.Selector
  title={$dict.expenses.participants.title}
  options={{ managedContactsCreation: true }} />
