<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { goto, preloadCode } from '$app/navigation'
  import { faded } from './store'
  import { exact, nested, type Section } from './Nav'
  import Button from './Button.svelte'
  import Back from './Back.svelte'
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

  function href(section: Section) {
    if (collapsed) return null
    else return exact(section, page.url.pathname) ? null : section.href
  }

  function click(section: Section) {
    if (collapsed) void goto(section.href)
    else {
      const ref = href(section)

      if (ref === null) window.scrollTo({ top: 0, behavior: 'smooth' })
      else void goto(ref)
    }
  }
</script>

{#each sections as section (section.href)}
  {@const hidden = !visible.includes(section)}
  {#if collapsed && !hidden}
    {@const ret = { href: section.href }}
    <Back {ret} {section} />
  {:else}
    <div>
      <Button
        id={`nav-${section.id}-button`}
        onclick={() => click(section)}
        active={section.id === active?.id}
        unseen={section.unseen}
        faded={$faded}
        class={[hidden && 'hidden']}>
        <section.Icon color="var(--muted-foreground)" />
        <span>{section.label}</span>
      </Button>
    </div>
  {/if}
{/each}
