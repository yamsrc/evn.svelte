<script lang="ts">
  import Download from '@lucide/svelte/icons/download'
  import Section from '@/app/ui/Section.svelte'
  import { Button } from '$ui/button'
</script>

<header class="sticky top-0 z-10 w-full bg-neutral-950 text-white">
  <Section class="max-w-7xl flex items-center justify-between py-3">
    <div class="flex items-center gap-8">
      <a href="#top" class="flex items-center">
        <img src="/icon.svg" alt="Evnly" width="32" height="32" />
      </a>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#how-it-works" class="text-sm text-white/90 hover:text-white">How It Works</a>
        <a href="#features" class="text-sm text-white/90 hover:text-white">Value Props</a>
        <a href="#reviews" class="text-sm text-white/90 hover:text-white">Reviews</a>
      </nav>
    </div>

    <Button href="#download" class="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
      Download Now
      <Download class="size-4" />
    </Button>
  </Section>
</header>
