<template>
  <div class="va-accordion">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { Options } from 'vue-class-component'
import VaCollapse from '../va-collapse/VaCollapse.vue'

const PropsMixin = makeContextablePropsMixin({
  value: { type: Array, default: () => [] },
  multiply: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

@Options({
  name: 'VaAccordion',
})
export default class VaAccordion extends Mixins(
  StatefulMixin,
  PropsMixin,
) {
  collapses: (any)[] = []
  @Provide() accordion = {
    onChildChange: (child: any) => this.onChildChange(child),
    onChildMounted: (child: any) => this.onChildMounted(child),
    onChildUnmounted: (child: any) => this.onChildUnmounted(child),
  }

  onChildChange (child: any) {
    const emitValue: any = []
    this.collapses.forEach((collapse) => {
      if (collapse === child) {
        emitValue.push(collapse.valueProxy)
        return
      }
      if (!this.c_multiply) {
        collapse.valueProxy = false
      }
      emitValue.push(collapse.valueProxy)
    })
    this.valueComputed = emitValue
  }

  onChildMounted (collapse: any) {
    this.collapses.push(collapse)
  }

  onChildUnmounted (removableCollapse: any) {
    this.collapses = this.collapses.filter(collapse => collapse !== removableCollapse)
  }

  mounted () {
    this.collapses.forEach((collapse, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }

  updated () {
    this.collapses.forEach((collapse, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-accordion {
}
</style>