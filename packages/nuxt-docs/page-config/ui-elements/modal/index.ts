

import apiOptions from './api-options'
import { apiExamplesObject, methodsApi, optionsApi } from './modal-api'




export default definePageConfig({
  blocks: [
  block.title('modal.title'),
  block.paragraph('modal.summaryText'),

  block.subtitle('all.examples'),

  block.example(    'Overview',
  ),
  block.example(    'Stateful',
  ),
  block.example(    'Fullscreen',
  ),

  block.headline('modal.toggleVisibility.title'),
  block.paragraph('modal.toggleVisibility.text'),
  block.headline('modal.toggleVisibility.sections[0].title'),
  block.paragraph('modal.toggleVisibility.sections[0].text'),
  block.headline('modal.toggleVisibility.sections[1].title'),
  block.paragraph('modal.toggleVisibility.sections[1].text'),
  block.example('ToggleVisibility'),

  block.example(    'Anchor',
  ),
  block.example(    'CustomContent',
  ),
  block.example(    'DisableAnimation',
  ),
  block.example(    'ModalSizing',
  ),
  block.example(    'HidingOverlay',
  ),
  block.example(    'BlurredOverlay',
  ),
  block.example(    'ScrollingLongContent',
  ),
  block.example(    'Customization',
  ),
  block.example(    'NestedModals',
  ),
  block.example(    'BeforeClose',
  ),

  block.subtitle('all.api'),
  block.api('VaModal', apiOptions),

  block.subtitle('all.cssVariables'),
  block.file('vuestic-ui/src/components/va-modal/_variables.scss'),

  block.subtitle('modal.functionalApi.title'),
  block.paragraph('modal.functionalApi.text'),
  block.code(apiExamplesObject),
  block.example('Create'),
  block.headline('all.methods'),
  methodsApi(block),
  block.headline('all.options'),
  optionsApi(block),
]
})
