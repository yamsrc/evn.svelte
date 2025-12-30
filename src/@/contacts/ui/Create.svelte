<script lang="ts">
  import { Cosmetics, type Value } from '@/app/ui'

  async function onchange(value: Value) {
    console.log('create', value)
  }
</script>

<Cosmetics label="Add friend" {onchange} />
