import { compose } from '../../shared/utils'
import withHelmet from './with-helmet'
import withMui5 from './with-mui5'
import withRouter from './with-router'

/**
 * @hoc Initialize app logic
 */
export const withProviders = compose(withHelmet, withRouter, withMui5)
