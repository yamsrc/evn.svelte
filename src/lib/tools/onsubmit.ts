export function onsubmit(callback: Callback) {
  return async (event: Event) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const fieldsets = form.querySelectorAll('fieldset') as NodeListOf<HTMLFieldSetElement>
    const disabled: HTMLFieldSetElement[] = []

    for (const fieldset of fieldsets) {
      fieldset.disabled = true
      disabled.push(fieldset)
    }

    await callback(event)

    for (const fieldset of disabled)
      fieldset.disabled = false
  }
}

type Callback = (event: Event) => Promise<void> | void
