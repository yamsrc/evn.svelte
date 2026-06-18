import type { Detail } from './transport'

declare global {
  interface WebkitMessageHandlers {
    shell?: { postMessage: (msg: { id: string, label: string, arguments?: unknown }) => void }
  }

  interface WindowEventMap {
    shell: CustomEvent<Detail>
  }
}

export {}
