import { channel } from './channel'

export const supported = () => channel.available()
export type { Notification } from './Notification'
export { ping } from './ping'
export { request, subscribe } from './subscribe'
export { unsubscribe } from './unsubscribe'
export * from './store'
