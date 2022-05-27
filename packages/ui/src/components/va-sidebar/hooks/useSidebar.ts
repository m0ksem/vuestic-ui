import { useElementBackground } from '../../../composables/useElementBackground'
import { provide, inject, getCurrentInstance, toRef, ref } from 'vue'

const key = Symbol('VaSidebar')

export const useSidebar = () => {
  const { props } = getCurrentInstance()!

  provide(key, {
    color: toRef(props, 'color'),
  })
}

export const useSidebarItem = () => {
  const { background } = useElementBackground()

  return {
    sidebarColor: background,
  }
}
