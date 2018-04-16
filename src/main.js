import * as postcss from 'postcss'

import { CustomProperties } from './custom-properties'

export default postcss.plugin(PLUGIN_NAME, (options = {}) => {
  return (style, result) => {
    const customProperties = new CustomProperties(style)

    style.walkAtRules(/^(media|custom-media)$/i, rule => {
      rule.params = customProperties.resolveValue(rule.params)
    })
  }
})
