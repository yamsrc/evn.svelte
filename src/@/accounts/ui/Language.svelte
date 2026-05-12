<script lang="ts">
  import { me } from '@/accounts'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { dictionaries, locale, locales, selected, resolveLocale } from '$lib/intl'

  function change(value: string) {
    const picked = resolveLocale(value)

    selected.set(picked)
    void me.update({ locale: picked })
  }
</script>

<Select type="single" value={$locale} onValueChange={change}>
  <SelectTrigger class="w-full">{dictionaries[$locale].native}</SelectTrigger>
  <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
    {#each locales as code (code)}
      <SelectItem value={code}>{dictionaries[code].native}</SelectItem>
    {/each}
  </SelectContent>
</Select>
