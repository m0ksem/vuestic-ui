import kebabCase from 'lodash/kebabCase.js'
import { defineCustomElement } from 'vue'
import { VuesticComponent } from '../vue-plugin/types/index'

/**
 * We need to re-order component registration, so
 * components which provide something should be registered first
 */
const componentsOrder = [
  'VaConfig', // VaConfig should be registered before any component, because it provides them config
  'VaForm', // VaForm registered before any component, but not before VaConfig
  'VaAccordion',
  'VaFileUpload',
  'VaSidebar',
  'VaTabs',
]

// TODO: Not sure, but we might add global config support here.
/** Register vuestic components as Custom Elements */
export const registerVuesticWebComponents = (options: {
  /**
   * In case you need pass some css to shadow-dom of Custom Element
   *
   * @example
   * For Material Icons support inside Custom Element we need to pass `.material-icons` class.
   * Notice: we don't need to pass font, but only style. Fonts are inherited from actual DOM.
```css
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
```
   */
  css?: string,

  /**
   * Vuestic Component that must be registered as Custom Elements.
   *
   * **Make sure to make all imports from `vuestic-ui/web-components`**.
   */
  components: Record<string, VuesticComponent>
}) => {
  const { css, components } = options

  Object
    .entries(components)
    // Re-order components, so components which provides something always registered first
    .sort(([nameA], [nameB]) => {
      if (!componentsOrder.includes(nameA) && !componentsOrder.includes(nameB)) {
        return 0 // Skip components without order
      }

      let indexA = componentsOrder.indexOf(nameA)
      let indexB = componentsOrder.indexOf(nameB)
      // If component is unordered, this means that it should be after ordered components
      if (indexA === -1) { indexA = Number.MAX_SAFE_INTEGER }
      if (indexB === -1) { indexB = Number.MAX_SAFE_INTEGER }

      return indexA - indexB
    })
    .forEach(([name, component]) => {
      const customElement = defineCustomElement(component as any)

      // Add custom CSS to component's Shadow DOM
      if (css && 'styles' in component) { component.styles.push(css) }

      customElements.define(`${kebabCase(name)}`, customElement)
    })
}
