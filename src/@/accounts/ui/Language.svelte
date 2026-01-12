<script lang="ts">
  import { locale } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { me } from '@/accounts'
  import { options } from './Language'

  function change(locale: string) {
    void me.update({ locale })
  }
</script>

<Select type="single" value={$locale} onValueChange={change}>
  {@const selected = options.find((option) => option.value === $locale)}
  <SelectTrigger class="w-full">{selected?.label}</SelectTrigger>
  <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
    {#each options as option (option.value)}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>
