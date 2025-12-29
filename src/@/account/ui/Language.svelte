<script lang="ts">
  import { locale } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { update } from '@/iam'
  import { options } from './Language'

  async function change(locale: string) {
    await update({ locale })
  }
</script>

<Select type="single" value={$locale} onValueChange={change}>
  {@const selected = options.find((option) => option.value === $locale)}
  <SelectTrigger class="w-full">{selected?.label}</SelectTrigger>
  <SelectContent>
    {#each options as option (option.value)}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>
