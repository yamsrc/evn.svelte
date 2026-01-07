import Actions from './Actions.svelte'
import Content from './Content.svelte'
import Cosmetics from './Cosmetics.svelte'
import Name from './Name.svelte'
import Note from './Note.svelte'
import Picture from './Picture.svelte'
import Root from './Root.svelte'

export type { Props, Value } from './Cosmetics'

// Export compound components
export {
  Root,
  Content,
  Picture,
  Name,
  Note,
  Actions,
  //
  Root as CosmeticsRoot,
  Content as CosmeticsContent,
  Picture as CosmeticsPicture,
  Name as CosmeticsName,
  Note as CosmeticsNote,
  Actions as CosmeticsActions,
}

// Export default Cosmetics component
export default Cosmetics
export { Cosmetics }
