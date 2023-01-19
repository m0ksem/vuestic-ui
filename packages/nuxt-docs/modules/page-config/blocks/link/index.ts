import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string, href: string, options: {
    preText?: string,
    afterText?: string,
  } = {}) => {
    return {
      type: 'link',
      text,
      href,
      ...options,
    }
  },
  component: Component,
})

