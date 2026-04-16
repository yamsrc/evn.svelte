import type { ActionReturn } from 'svelte/action'
import type { Snippet } from 'svelte'

export interface Props {
  children?: Snippet
  oncomplete?: (id: string) => void
}

interface ActionOptions {
  ondrop?: (file: File) => void
}

export function dropzone(node: HTMLElement, options: ActionOptions): ActionReturn {
  function ondrop(event: DragEvent) {
    const file = drop(event)

    if (file === undefined) return

    options.ondrop?.(file)
  }

  node.addEventListener('dragover', dragover)
  node.addEventListener('drop', ondrop)

  return {
    destroy: () => {
      node.removeEventListener('dragover', dragover)
      node.removeEventListener('drop', ondrop)
    },
  }
}

function dragover(event: DragEvent) { event.preventDefault() }

function drop(event: DragEvent) {
  event.preventDefault()

  const files = event.dataTransfer?.files

  if (files === undefined || files.length === 0) {
    console.error('No files dropped')

    return
  }

  const file = files[0]

  if (!file.type.startsWith('image/')) {
    console.error('Invalid file type', file.type)

    return
  }

  return file
}
