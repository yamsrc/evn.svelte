<script lang="ts">
  import { me } from '@/accounts'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { locale, selected, resolveLocale } from '$lib/intl'
  import { options } from './Language'

  function change(value: string) {
    const picked = resolveLocale(value)

    selected.set(picked)
    void me.update({ locale: picked })
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
