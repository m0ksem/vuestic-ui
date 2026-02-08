/** Check if a value is a Promise */
export const isPromise = (value: unknown): value is Promise<unknown> => {
  return typeof value === 'object' && value !== null && 'then' in value && typeof value.then === 'function'
}
