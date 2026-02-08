import { watch, WatchOptions, WatchSource } from 'vue'

/**
 * A helper function that allows you to watch a source and perform an async operation inside the watcher without worrying about race conditions.
 */
export function watchAsync<T> (source: WatchSource | WatchSource[], fn: (isCancelled: () => boolean) => Promise<T>, options?: WatchOptions) {
  let updateId = 0

  watch(
    source,
    async (_, __, onCleanup) => {
      const currentUpdateId = ++updateId
      let cancelled = false

      onCleanup(() => {
        cancelled = true
      })

      await fn(() => cancelled || currentUpdateId !== updateId)
    },
    options,
  )
}
