

import apiOptions from './api-options'




export default definePageConfig({
  blocks: [
  block.title('navbar.title'),

  block.subtitle('all.examples'),

  block.example(    'Default',
  ),
  block.example(    'Colors',
  ),
  block.example(    'Height',
  ),
  block.example(    'Shape',
  ),

  block.subtitle('all.api'),
  block.api('VaNavbar', apiOptions),

  block.subtitle('all.cssVariables'),
  block.file('vuestic-ui/src/components/va-navbar/_variables.scss'),
]
})
