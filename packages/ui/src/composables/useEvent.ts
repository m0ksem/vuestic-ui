import { Component, Ref, unref, watch } from 'vue'
import { useWindow } from './useWindow'
import { unwrapEl } from '../utils/unwrapEl'

type MaybeRef<T> = Ref<T> | T

type UseEventEventName = keyof GlobalEventHandlersEventMap | string[]
type UseEventEvent<N extends UseEventEventName, D> = N extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[N] : D

/**
 * SSR safety listen to target event.
 * @param target by default window
 * @param event if string, listener will be fully typed. If array of string, you need to type event manually.
 *
 *
 * @example
 * ```ts
 * useEvent('resize': (e) => {})
 * useEvent(['mousedown', 'mouseup', 'mousemove'], (e) => {})
 * ```
 */
export const useEvent = <N extends UseEventEventName, E extends Event>(
  event: N,
  listener: (this: GlobalEventHandlers, event: UseEventEvent<N, E>) => any,
  target?: MaybeRef<GlobalEventHandlers | undefined | Component> | boolean,
) => {
  const source = (target && typeof target !== 'boolean') ? target : useWindow()
  const capture = typeof target === 'boolean' ? target : false

  watch(source, (newValue, oldValue) => {
    if (!Array.isArray(event)) {
      unwrapEl(unref(newValue))?.addEventListener(event, listener as any, capture)
      unwrapEl(unref(oldValue))?.removeEventListener(event, listener as any, capture)
    } else {
      event.forEach((e) => {
        unwrapEl(unref(newValue))?.addEventListener(e, listener as any, capture)
        unwrapEl(unref(oldValue))?.removeEventListener(e, listener as any, capture)
      })
    }
  }, { immediate: true })
}
