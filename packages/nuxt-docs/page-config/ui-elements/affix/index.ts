

import apiOptions from './api-options'

export default definePageConfig({
  blocks: [
  block.title('affix.title'),
  block.paragraph('affix.summaryText'),

  block.subtitle('all.examples'),

  block.headline('affix.examples.top.title'),
  block.example('Top'),

  block.headline('affix.examples.bottom.title'),
  block.example('Bottom'),

  block.headline('affix.examples.default.title'),
  block.example('Default'),

  block.subtitle('all.api'),
  block.api('VaAffix', apiOptions),

  block.subtitle('all.cssVariables'),
  block.file('vuestic-ui/src/components/va-affix/_variables.scss'),
]
})
