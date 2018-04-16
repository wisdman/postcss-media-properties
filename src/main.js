import * as postcss from 'postcss'

import { CustomProperties } from './custom-properties'

/**
 * Plugin module export
 */
export default postcss.plugin(PLUGIN_NAME, (options = {}) => {

  /**
   * Plugin main function
   *
   * @param   {postcss.Root}      style PostCSS AST root
   * @return  {void}
   */
  return style => {
    const customProperties = new CustomProperties(style)

    style.walkAtRules(/^(media|custom-media)$/i, rule => {
      rule.params = customProperties.resolveValue(rule.params)
    })
  }

})
