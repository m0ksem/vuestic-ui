const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj)

/**
 * Merge objects deep
 * @notice If property is array, it will replace target value
 */
export const mergeDeep = <
  O1 extends Record<string, any> | undefined | null,
  O2 extends Record<string, any> | undefined | null
>(target: O1, source: O2): O1 & O2 => {
  const base = isObject(target)
    ? Object.create(
      Object.getPrototypeOf(target),
      Object.getOwnPropertyDescriptors(target),
    )
    : {} as O1 & O2

  target = target || {} as NonNullable<O1>
  source = source || {} as NonNullable<O2>

  for (const key in source) {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (sourceValue instanceof RegExp || sourceValue instanceof Date) {
      base[key] = sourceValue
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      base[key] = mergeDeep(Object.create(
        Object.getPrototypeOf(targetValue),
        Object.getOwnPropertyDescriptors(targetValue),
      ), sourceValue)
    } else if (isObject(sourceValue)) {
      base[key] = mergeDeep(Object.create(
        Object.getPrototypeOf(sourceValue),
        Object.getOwnPropertyDescriptors(sourceValue),
      ), sourceValue)
    } else {
      base[key] = sourceValue
    }
  }

  return base as O1 & O2
}

/**
 * Merge multiple objects deeply
 * @notice If property is array, it will replace target value
 */
export const mergeDeepMultiple = (...objects: any[]): any => {
  return objects.reduce((acc, obj) => mergeDeep(acc, obj), {})
}
