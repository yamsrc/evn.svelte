import Cosmetics from './Cosmetics.svelte'
import Actions from './cosmetics-actions.svelte'
import Name from './cosmetics-name.svelte'
import Note from './cosmetics-note.svelte'
import Picture from './cosmetics-picture.svelte'
import Root from './cosmetics-root.svelte'

export type { Props, Value } from './Cosmetics'

// Export compound components
export {
  Root,
  Picture,
  Name,
  Note,
  Actions,
  //
  Root as CosmeticsRoot,
  Picture as CosmeticsPicture,
  Name as CosmeticsName,
  Note as CosmeticsNote,
  Actions as CosmeticsActions,
}

// Export default Cosmetics component
export default Cosmetics
export { Cosmetics }
