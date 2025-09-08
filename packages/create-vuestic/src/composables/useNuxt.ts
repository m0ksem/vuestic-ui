import { useFiles } from "./useFiles"

export const useNuxt = async () => {
  const { isFileExists, resolveCorrectExt } = await useFiles()

  const isAppDirectory = isFileExists('app/') && !isFileExists('app.vue')

  const pathPrefix = isAppDirectory ? 'app/' : ''

  const nuxtConfig = resolveCorrectExt('nuxt.config', ['ts', 'js'])

  return {
    isAppDirectory,
    pathPrefix,
    nuxtConfig
  }
}
