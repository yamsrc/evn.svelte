<script lang="ts">
  import { onMount } from 'svelte'

  const id = import.meta.env.VITE_GA_ID

  onMount(() => {
    if (!id) return

    window.dataLayer ??= []

    window.gtag ??= function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', id, { send_page_view: false })

    const script = document.createElement('script')

    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)
  })
</script>
