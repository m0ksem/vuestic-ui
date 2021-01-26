import { shallowMount, mount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { testHasKeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/testHasKeyboardOnlyFocusMixin'

import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

import VaCollapse from '../VaCollapse.vue'

describe('VaCollapse', () => {
  it('should render without an error', () => {
    // -------------- Troxubles with an icon context ------------------
    const wrapper: any = mount(VaCollapse)
    expect(wrapper.findComponent('VaCollapse')).toBeTruthy()
  })
  it('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaCollapse as any) as StatefulMixin),
    ).not.toThrow()
  })
  it('has KeyboardOnlyFocusMixin', () => {
    expect(() =>
      testHasKeyboardOnlyFocusMixin((VaCollapse as any) as KeyboardOnlyFocusMixin),
    ).not.toThrow()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaCollapse as any) as ColorThemeMixin),
    ).not.toThrow()
  })

  // -------------- Troxubles with an icon context ------------------
  // it('is contextable', () => {
  //   const props = {
  //     value: false,
  //     disabled: false,
  //     header: '',
  //     icon: '',
  //     solid: false,
  //     color: '',
  //     textColor: '',
  //     colorAll: false,
  //   }
  //   expect(() => testIsContextableComponent(VaCollapse, props)).not.toThrow()
  // })

  it('should have disabled class', () => {
    const wrapper: any = shallowMount(VaCollapse as any, {
      propsData: {
        value: true,
        disabled: true,
        solid: true,
      },
      data () {
        return {
          popout: true,
          inset: true,
        }
      },
    })
    expect(wrapper.classes()).toContain('va-collapse--disabled')
    expect(wrapper.classes()).toContain('va-collapse--solid')
    expect(wrapper.classes()).toContain('va-collapse--active')
    expect(wrapper.classes()).toContain('va-collapse--popout')
    expect(wrapper.classes()).toContain('va-collapse--inset')
  })

  it('should emit `input`', async () => {
    const wrapper: any = shallowMount(VaCollapse as any)
    await wrapper.vm.changeValue()
    expect(wrapper.emitted().input.length).toBe(1)
  })

  it('should emit `focus`', async () => {
    const wrapper: any = shallowMount(VaCollapse as any)
    await wrapper.vm.onFocus()
    expect(wrapper.emitted().focus.length).toBe(1)
  })

  it('should be triggered on mousedown', async () => {
    const wrapper: any = shallowMount(VaCollapse as any)
    const collapseHeader = wrapper.find('.va-collapse__header')

    await collapseHeader.trigger('mousedown')
    expect(wrapper.vm.hasMouseDown).toBe(true)
    await collapseHeader.trigger('mouseup')
    expect(wrapper.vm.hasMouseDown).toBe(false)
  })
})