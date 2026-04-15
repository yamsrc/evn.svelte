import type { ActionReturn } from 'svelte/action'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  oncomplete?: (id: string) => void
}

export function dropzone(node: HTMLElement): ActionReturn {
  node.addEventListener('dragover', dragover)
  node.addEventListener('drop', drop)

  return {
    destroy: () => {
      node.removeEventListener('dragover', dragover)
      node.removeEventListener('drop', drop)
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

  // upload
  void 0
}
