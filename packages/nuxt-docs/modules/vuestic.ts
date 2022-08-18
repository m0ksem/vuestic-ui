import { defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'pathe'
import { VuesticOptions } from './../../nuxt/src/types';
import originalNuxtModule from '../../nuxt/src/module'

/** 
 * @vuestic/nuxt module wrapper with relative resolved vuestic from packages/ui
 */
export default defineNuxtModule<VuesticOptions>({
  meta: {
    name: '@vuestic/nuxt-dev',
    configKey: 'vuestic',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {
    config: {},
    css: true
  },

  setup (options, nuxt) {
    const vuesticMainPath = resolve(__dirname, '../../ui/src/main.ts')
    const vuesticCSSPath = resolve(__dirname, '../../ui/src/styles/index.scss')

    nuxt.options.alias['vuestic-ui/css'] = vuesticCSSPath;
    nuxt.options.alias['vuestic-ui'] = vuesticMainPath;

    originalNuxtModule(options, nuxt)
  }
})

export * from '../../nuxt/src/types'