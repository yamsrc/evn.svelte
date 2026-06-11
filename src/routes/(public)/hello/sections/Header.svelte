<script lang="ts">
  import Download from '@lucide/svelte/icons/download'
  import { track } from '@/ga'
  import Section from '@/app/ui/Section.svelte'
  import { Button } from '$ui/button'
  import { dict } from '../intl'
</script>

<header class="sticky top-0 z-10 w-full bg-neutral-950 text-white">
  <Section class="max-w-7xl flex items-center justify-between py-3">
    <div class="flex items-center gap-8">
      <a href="#top" class="flex items-center">
        <img src="/icon.svg" alt="Evnly" width="32" height="32" />
      </a>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#how-it-works">{$dict.header.nav.howItWorks}</a>
        <a href="#features">{$dict.header.nav.features}</a>
        <a href="#reviews">{$dict.header.nav.reviews}</a>
      </nav>
    </div>

    <Button
      href="#download"
      onclick={() => track('hello.cta', { name: 'install-app' })}
      class="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
      {$dict.header.installApp}
      <Download class="size-4" />
    </Button>
  </Section>
</header>
