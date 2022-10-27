import isObject from 'lodash/isObject.js'

// Find value in the object with an array of keys
export const getNestedValue = (option: Record<string, any>, propsArray: string[]): any => {
  if (propsArray.length === 0) { return option }

  const nestedItem = option[propsArray[0]]
  if (!isObject(nestedItem)) {
    if (propsArray.length === 1) {
      return nestedItem
    }
    return undefined
  }
  return getNestedValue(nestedItem, propsArray.slice(1))
}

/**
 * Finds value in the object using string with dots 'key.key.key'
 *
 * @param option
 * @param prop
 */
export const getValueByPath = <Key extends string, T extends Record<string | Key, unknown>>(option: T, prop: string | Key) => {
  if (prop in option) {
    return option[prop as Key]
  }
  prop = prop.replace(/^\./, '') // remove first point symbol
  return getNestedValue(option, prop.split('.'))
}

/**
 * Finds value of nested property inside an object.
 *
 * @param option - Object to look properties inside.
 * @param prop - String or function used to find nested property.
 */
export const getValueByKey = <T extends Record<string, unknown>>(
  option: T | string | number | ((...args: any[]) => any),
  prop: string | ((option: T) => any),
): any => {
  if (!option || typeof option !== 'object' || Array.isArray(option)) { return undefined }

  if (!prop) { return option }
  if (typeof prop === 'string') { return getValueByPath(option, prop) }
  if (typeof prop === 'function') { return prop(option) }

  // if `prop` has different to string or function type and can't be processed
  return option
}
