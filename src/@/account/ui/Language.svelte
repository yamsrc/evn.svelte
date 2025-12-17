<script lang="ts">
  import { locale, selected } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { set } from '@/account'
  import { options } from './Language'

  let value = $derived($selected ?? undefined)

  async function change(language: string) {
    await set({ language })
  }
</script>

<Select type="single" bind:value onValueChange={change}>
  {@const selected = options.find((option) => option.value === $locale)}
  <SelectTrigger class="w-full">{selected?.label}</SelectTrigger>
  <SelectContent>
    {#each options as option (option.value)}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>
