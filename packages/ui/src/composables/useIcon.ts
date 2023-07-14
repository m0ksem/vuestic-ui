import { getIconConfiguration } from '../services/icon/utils/get-icon-configuration'
import { useGlobalConfig } from '../composables/useGlobalConfig'

export const useIcon = () => {
  const { globalConfig } = useGlobalConfig()

  return {
    getIcon: (name: string) => getIconConfiguration(name, globalConfig.value.icons),
  }
}
