import { createI18n, I18n, VueI18n } from 'vue-i18n'
import { messages, locales } from '~/locales'
import { useRouter, useRoute } from '#app'
import { useSSRCookie } from '../../shared/useSSRCookie'

type Locale = keyof typeof messages

const isLocaleExist = (locale: string): locale is Locale => {
  return locales.includes(locale)
}

const parseLocaleFromPath = (url: string | undefined) => {
  if (!url) { return null }

  const [path, locale] = url.match(/\/(\w*)\//) || []

  if (isLocaleExist(locale)) { return locale }

  return null
}

/** This plugin register i18n and sync it's locale with cookies */
export default defineNuxtPlugin(({ vueApp, ssrContext, provide }) => {
  const { getCookie, setCookie } = useSSRCookie()

  const getLocaleFromUrl = () => {
    if (ssrContext) { // Server
      return parseLocaleFromPath(ssrContext.url)
    } else {          // Client
      return useRoute().query.locale as string
    }
  } 

  const locale = getLocaleFromUrl() || getCookie('locale') || 'en'

  // TODO: This can be optimized with vite-plugin // How? I don't remember
  const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    messages,
    missing (_, key) {
      return key
    },
  })

  // provide('i18n', i18n.global)

  const { beforeEach, replace } = useRouter()

  beforeEach((newRoute) => {
    const newLocale = newRoute.params.locale as string

    if (newLocale === undefined || newLocale === i18n.global.locale) { return }
    if (isLocaleExist(newLocale)) {
      i18n.global.locale = newLocale
      setCookie('locale', newLocale)
    } else {
      const newPath = newRoute.fullPath.replace(`/${newLocale}/`, '/en/')

      replace(newPath)
    }
  })

  vueApp.use(i18n)
})


declare module '#app' {
  interface NuxtApp {
    $i18n: VueI18n
  }
}
