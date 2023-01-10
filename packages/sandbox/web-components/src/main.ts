import { registerVuesticWebComponents, VaButton, VaSelect, VaTab, VaTabs, VaConfig } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'

registerVuesticWebComponents({
  components: {
    VaButton,
    VaSelect,
    VaTab,
    VaTabs,
    VaConfig,
  },

  css: `
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
  `
})
