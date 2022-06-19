import { onMounted, onBeforeUnmount, ref, getCurrentInstance, onUpdated, Ref } from 'vue'

/** Returns ref of current component instance element */
export const useCurrentElement = (el?: Ref<HTMLElement | undefined>) => {
  if (el) { return el }
  const vm = getCurrentInstance()!
  const currentEl = ref<HTMLElement>()
  onMounted(() => { currentEl.value = vm.proxy!.$el ?? undefined })
  onUpdated(() => { currentEl.value = vm.proxy!.$el ?? undefined })
  onBeforeUnmount(() => { currentEl.value = vm.proxy!.$el ?? undefined })

  return currentEl
}
