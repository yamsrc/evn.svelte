<script lang="ts">
  import { onMount } from 'svelte'
  import { back } from '$com/history'
  import { page } from '$app/state'
  import { preloadCode } from '$app/navigation'
  import { exact, match, nested, type Section } from './Nav'
  import Button from './Button.svelte'
  import type { Props } from './Sections'

  const { sections, faded }: Props = $props()

  const active = $derived(sections.find((section) => match(section, page.url.pathname)))
  const collapsed = $derived(active ? nested(active, page.url.pathname) : false)
  const visible = $derived(
    sections.filter((section) => !collapsed || match(section, page.url.pathname)),
  )

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
  {@const isActive = match(section, page.url.pathname)}
  {@const hidden = !visible.includes(section)}
  <li>
    <Button
      id={`nav-${section.id}-button`}
      href={link(section)}
      onclick={collapsed ? () => back(section.href) : null}
      active={isActive}
      unseen={section.unseen}
      {faded}
      class={[hidden && 'hidden']}>
      <section.Icon color="var(--muted-foreground)" />
      <span>{section.label}</span>
    </Button>
  </li>
{/each}
