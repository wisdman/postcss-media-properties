/*
 * Custom Properties engine
 */

export class CustomProperties {

  constructor(style) {
    this._style = style
    this._map = {}

    // Collect ':root' scope custom properties
    this._style.walkRules(/^:root/i, rule => {
      rule.walkDecls(/^--.*/, declaration => {
        this._map[declaration.prop] = declaration
      })
    })
  }

  resolveValue(value, parents = []) {

    let str = value
    let result = ''

    let match
    while (match = /var\([\f\n\r\t\s]*(--[\w-]+)[\f\n\r\t\s]*,?/.exec(str)) {

      const name = match[1]

      if (parents.includes(name)) {
        throw this._style.error(`Circular Custom Property reference: "${name}"`, { word: name })
      }

      result += str.slice(0, match.index)
      str = str.slice(match.index + match[0].length)

      let count = 1
      let idx = 0

      // Get balanced braket index
      while (idx < str.length && count > 0) {
        if (str[idx] === '(') count++
        else if (str[idx] === ')') count--
        idx++
      }

      if (count !== 0) {
        throw this._style.error(`missing closing ")" in the value "${value}"`)
      }

      const fallback = str.slice(0, idx - 1)
      str = str.slice(idx)

      const declaration = this._map[name] || undefined
      const newValue = this.resolveValue(declaration && declaration.value || fallback, [...parents, name]).trim()

      if (!newValue) {
        throw this._style.error(`Custom Property "${name}" is undefined and used without a fallback`, { word: name })
      }

      result += newValue
    }

    result += str
    return result
  }
}
