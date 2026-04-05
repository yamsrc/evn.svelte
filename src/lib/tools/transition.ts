import { derived, writable, type Readable } from 'svelte/store'
import type { OnNavigate } from '@sveltejs/kit'

export function transit(fn?: (() => void) | (() => Promise<void>)): Promise<void> {
  if (fn === undefined) return Promise.resolve()

  if (document.startViewTransition === undefined)
    return Promise.resolve(fn())
  else {
    depart()

    return new Promise((resolve) => document.startViewTransition(async () => {
      resolve(await fn())
    }).finished.then(() => arrive()))
  }
}

export function navigate(nav: OnNavigate): Promise<void> | void {
  if (nav.type === 'popstate' && nav.event.hasUAVisualTransition) return

  return transit()
}

export function takeoff(id: string, name: string, classes?: string) {
  const el = document.getElementById(id)

  if (el === null) {
    console.warn('No element to depart from', id)

    return
  }

  el.style.viewTransitionName = name

  if (classes !== undefined)
    el.style.viewTransitionClass = classes
}

const flying = writable<boolean>(false)
const flyers = new Set<Flyer>()

/**
 * Action to include an element in the non-navigation view transitions.
 *
 * @param node
 * @param options
 * @returns
 */
export function transition(node: HTMLElement, options: FlyOptions) {
  const flyer = {
    node,
    options,
    original: {
      name: node.style.viewTransitionName,
      classes: node.style.viewTransitionClass,
    },
  }

  flyers.add(flyer)

  return {
    destroy: () => flyers.delete(flyer),
  }
}

/**
 * Create a readable store that has `style` value when in non-navigation view transition.
 *
 * @param name
 * @param classes
 * @returns Readable<string | undefined>
 */
export function styles(name: string, classes?: string): Readable<string | undefined> {
  let value = `view-transition-name: ${name};`

  if (classes !== undefined)
    value += ` view-transition-class: ${classes};`

  return derived(flying, (flying) => flying ? value : undefined)
}

function depart() {
  flying.set(true)

  for (const flyer of flyers) {
    // could have changed
    flyer.original = {
      name: flyer.node.style.viewTransitionName,
      classes: flyer.node.style.viewTransitionClass,
    }

    flyer.node.style.viewTransitionName = flyer.options.name

    if (flyer.options.classes !== undefined)
      flyer.node.style.viewTransitionClass = flyer.options.classes
  }
}

function arrive() {
  for (const flyer of flyers) {
    if (flyer.original === undefined) continue

    flyer.node.style.viewTransitionName = flyer.original.name
    flyer.node.style.viewTransitionClass = flyer.original.classes
  }

  flying.set(false)
}

interface Flyer {
  node: HTMLElement
  options: FlyOptions
  original?: {
    name: string
    classes: string
  }
}

interface FlyOptions {
  /** view-transition-name */
  name: string
  /** view-transition-class */
  classes?: string
}
