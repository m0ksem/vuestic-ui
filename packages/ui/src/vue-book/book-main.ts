import { createApp } from 'vue'
import App from './BookApp.vue'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

import demoIconAliases from './vuestic-config/demo-icon-aliases'
import demoIconFonts from './vuestic-config/demo-icon-fonts'

import './vue-book-overrides.scss'
import { createIconsConfig, createVuesticEssential, VaToastPlugin, VaDropdownPlugin, VuesticComponents } from '../main'
import { colorsPresets } from '../services/color-config/color-theme-presets'

const app = createApp(App)

const routes = [
  createRoute({
    requireContext: require.context('../components', true, /.demo.vue$/),
    path: '/demo',
  }),
  {
    path: '/:pathMatch(.*)*',
    redirect: '/demo',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(VueBookComponents)
app.use(router)

app.use(createVuesticEssential({
  config: {
    icons: createIconsConfig({
      aliases: demoIconAliases,
      fonts: demoIconFonts,
    }),
    colors: {
      ...colorsPresets.default,
      banana: '#d0f55d',
    },
  },
  plugins: { VaToastPlugin, VaDropdownPlugin },
}))

// We don't register any component globally in vue-book
declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface GlobalComponents extends VuesticComponents<''> {}
}

app.mount('#app')
