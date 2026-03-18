<script lang="ts">
  import { Participants } from '@/app/ui'

  const options = $state({
    shareUrl: '/join/participants/123/',
    managedContactsCreation: true,
  })
</script>

<Participants.Selector {options} />
