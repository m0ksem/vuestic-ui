import { type Ref, unref, watchEffect } from 'vue'
import { type PageConfigOptions } from "../modules/page-config"

type PageConfigJSModule = { default: PageConfigOptions }

const files = Object.entries(import.meta.glob<false, string, PageConfigJSModule>('../page-config/**/index.ts'))
  .reduce((acc, [key, fn]) => {
    const name = key.replace('../page-config/', '').replace('/index.ts', '')

    if (name.split('/').length > 2) { return acc }

    acc[name] = fn
    return acc
  }, {} as Record<string, () => Promise<PageConfigJSModule>>)

export const usePageConfigs = () => {
  return files
}

export const usePageConfig = (name: string | Ref<string>) => {
  const config = ref<PageConfigOptions | null>(null)

  watchEffect(() => {
    console.log('Loading', unref(name))
    const file = files[unref(name)]

    if (!file) {
      console.log(`Page config ${name} not found`)
      console.log(Object.keys(files))
      config.value = null
      return
    }

    file().then((module) => {
      config.value = module.default
    })
  })

  return config
}
