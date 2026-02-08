import { WritableComputedRef, computed, reactive } from 'vue'
import { useAppContext } from './useAppContext'
import { isPromise } from '../../../utils'

const getGlobalObject = () => {
  const appContext = useAppContext()

  const app = appContext.value!.app

  const { globalProperties } = app!.config

  if ('$vaGlobalVariable' in globalProperties) {
    return globalProperties.$vaGlobalVariable
  }

  globalProperties.$vaGlobalVariable = reactive({})

  return globalProperties.$vaGlobalVariable
}

/**
 * This composable must be used to make global variables. This global is shared in app context, rather then
 * in window context. This is useful to avoid global variables in window context in multiple app mode, ssr
 * or cjs build can mess up global variables
 */
export const useAppGlobal = <T>(key: string, defaultValue: () => T): typeof defaultValue extends () => Promise<infer U> ? Promise<WritableComputedRef<U>> : WritableComputedRef<T> => {
  const globalObject = getGlobalObject()

  const accessPoint = computed({
    get: () => globalObject[key],
    set: (value: T) => {
      globalObject[key] = value
    },
  })

  if (key in globalObject && isPromise(globalObject[key])) {
    return globalObject[key].then(() => accessPoint) as any
  }

  if (!(key in globalObject)) {
    const result = defaultValue()

    if (isPromise(result)) {
      const initPromise = (result as Promise<T>).then((resolvedValue: T) => {
        globalObject[key] = resolvedValue
        return accessPoint
      })

      globalObject[key] = initPromise as unknown as T

      return initPromise as any
    } else {
      globalObject[key] = result
    }
  }

  return accessPoint as any
}
