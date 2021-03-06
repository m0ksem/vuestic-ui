import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t, locale } from '../../../../helpers/I18nHelper'

export default [
  DocsHelper.title('globalConfig.title'),
  DocsHelper.paragraph('globalConfig.subtitle'),
  DocsHelper.paragraph('globalConfig.structure'),
  DocsHelper.paragraph('globalConfig.setupExampleTitle'),
  DocsHelper.code(`
import { VuesticPlugin } from 'vuestic-ui'

createApp(App)
  .use(VuesticPlugin, {
    icons: [ ... ],
    components: { ... },
    colors: { ... },
  })
  .mount('#app')
  `),
  DocsHelper.paragraph('globalConfig.reactiveUpdateExampleTitle'),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { mergeGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      mergeGlobalConfig({
        icons: { { name: 'phone', to: 'fas-phone' } },
        components: { VaButton: { ... } },
        colors: { 'primary': '#ff0' },
      })
    }

    return { setNewLookForOurApplication }
  }
}
  `),
  DocsHelper.paragraph('globalConfig.reactiveSetExampleTitle'),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { setGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      setGlobalConfig({
        icons: { ... },
        components: { ... },
        colors: { ... },
      })
    }

    return { setNewLookForOurApplication }
  }
}
  `),
  DocsHelper.paragraph('globalConfig.useInRuntime'),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'
import { computed } from 'vue'

export default {
  setup () {
    const { getGlobalConfig } = useGlobalConfig()

    const config = computed(() => getGlobalConfig())

    console.log(config.value)

    return { config }
  }
}
  `),
  DocsHelper.headline('globalConfig.links.readMore'),
  DocsHelper.link(t('globalConfig.links.components'), `/${locale}/services/components-config`),
  DocsHelper.link(t('globalConfig.links.colors'), `/${locale}/services/colors-config`),
  DocsHelper.link(t('globalConfig.links.icons'), `/${locale}/services/icons-config`),
  DocsHelper.subtitle('all.api'),
  DocsHelper.table(
    ['params', { title: 'type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['icons', 'IconsConfig', t('globalConfig.api.icons')],
      ['components', 'ComponentsConfig', t('globalConfig.api.components')],
      ['colors', 'ColorsConfig', t('globalConfig.api.colors')],
    ],
  ),
] as ApiDocsBlock[]
