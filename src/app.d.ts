// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: Record<string, { postMessage: (msg: unknown) => void }>
    }
  }

  namespace App {
    // interface Error {}
    // interface Locals {}

    interface PageData {
      meta?: {
        title?: string
        description?: string
        image?: {
          url: string
          width: number
          height: number
          type: string
        }
      }
    }

    // interface PageState {}
    // interface Platform {}
  }
}

export { }
