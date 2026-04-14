<script lang="ts">
  import { onMount } from 'svelte'
  import { back } from '$com/history'
  import { page } from '$app/state'
  import { preloadCode } from '$app/navigation'
  import { faded } from './store'
  import { exact, nested, type Section } from './Nav'
  import Button from './Button.svelte'
  import type { Props } from './Sections'

  const { sections, section: active }: Props = $props()

  const collapsed = $derived(active ? nested(active, page.url.pathname) : false)
  const visible = $derived(sections.filter(({ id }) => !collapsed || id === active?.id))

  onMount(() => {
    for (const section of sections) {
      preloadCode(section.href)
      section.nested?.forEach((nested) => preloadCode(nested))
    }
  })

  function link(section: Section) {
    if (collapsed) return null
    else return exact(section, page.url.pathname) ? null : section.href
  }
</script>

{#each sections as section (section.href)}
  {@const hidden = !visible.includes(section)}
  <div>
    <Button
      id={`nav-${section.id}-button`}
      href={link(section)}
      onclick={collapsed ? () => back(section.href) : null}
      active={section.id === active?.id}
      unseen={section.unseen}
      faded={$faded}
      class={[hidden && 'hidden']}>
      <section.Icon color="var(--muted-foreground)" />
      <span>{section.label}</span>
    </Button>
  </div>
{/each}
