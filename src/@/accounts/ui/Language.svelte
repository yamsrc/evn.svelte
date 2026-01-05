<script lang="ts">
  import { onMount } from 'svelte'
  import { locale } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { me } from '@/accounts'
  import { options, hidden } from './Language'

  function change(locale: string) {
    void me.update({ locale })
  }

  let opens = $state(0)
  let revealed = $state(false)

  function onOpenChange(open: boolean) {
    if (!open) return

    if (++opens === 5) revealed = true
  }

  onMount(() => (revealed = hidden.some((option) => option.value === $locale)))
</script>

<Select type="single" value={$locale} onValueChange={change} {onOpenChange}>
  {@const selected =
    options.find((option) => option.value === $locale) ??
    hidden.find((option) => option.value === $locale)}
  <SelectTrigger class="w-full">{selected?.label}</SelectTrigger>
  <SelectContent>
    {#each options as option (option.value)}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}

    {#if revealed}
      {#each hidden as option (option.value)}
        <SelectItem value={option.value}>{option.label}</SelectItem>
      {/each}
    {/if}
  </SelectContent>
</Select>
