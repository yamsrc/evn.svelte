<script lang="ts">
  import { Progress } from '$ui/progress'
  import { store } from './claims'
  import { progress } from './Progress'

  const value = $derived(progress($store))
</script>

<Progress {value} class={[value === 100 && '*:data-[slot=progress-indicator]:bg-constructive']} />
