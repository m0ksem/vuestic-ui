export * from './vuestic-plugin'
export { useColors, useBreakpoint, useI18nConfig } from './composables'
export { useGlobalConfig } from './services/global-config'
export {
  useIcon as useIcons,
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon-config'

// Export all components and their composables
export * from './components'

export type { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig } from './services/global-config/types'
export type { ComponentConfig } from './services/component-config'
export type { IconConfig, IconConfiguration } from './services/icon-config/types'
export type { ColorConfig } from './services/color-config/types'
