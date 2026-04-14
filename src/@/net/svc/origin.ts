import { connect } from '@toa.io/origin'
import * as config from '$config/configuration'

const origin = connect({ origin: config.origin, sleep: config.sleep })

console.info('Origin connected', config.origin, config.sleep ?? 'no sleep')

export { origin }
