// import Groups from '../services/groups'
// import Events from '../services/events'
import Logger from 'logplease'

export default {
  install: function (Vue, options) {
    Logger.setLogLevel('INFO')

    const logger = Logger.create('AppPlugin')
    // const groups = new Groups()

    logger.warn('Environment:', process.env.NODE_ENV)

    logger.info('Installing application services ...')
    // groups.init(options.store)
    // Events.init(options.store)

    logger.info('Application services installed ...')
    // Vue.prototype.$groups = groups
    // Vue.prototype.$events = Events

    logger.info('Application services registered...')
  }
}
