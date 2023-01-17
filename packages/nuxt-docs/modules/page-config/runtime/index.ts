import { DefineComponent } from 'vue'
import example from '../blocks/example'
import title from '../blocks/title'
import paragraph from '../blocks/paragraph'
import subtitle from '../blocks/subtitle'
import file from '../blocks/file'
import code from '../blocks/code'
import markdown from '../blocks/markdown'
import api from '../blocks/api'
import collapse from '../blocks/collapse'

// Need to define type in collapse without recursion
const blocksWithoutCollapse = {
  example,
  title,
  paragraph,
  subtitle,
  file,
  code,
  markdown,
  api,
}

export type BlockWithCollapse = ReturnType<(typeof blocksWithoutCollapse)[keyof typeof blocksWithoutCollapse]>

export const block = {
  ...blocksWithoutCollapse,
  collapse,
}

export type GlobalBlock = typeof block
export type Block = ReturnType<GlobalBlock[keyof typeof block]>

export type PageConfigOptions = {
  meta: {
    title: string;
    // TODO: Add more
    category: 'component' | 'introduction' | 'services'
    badge?: string
    visibility?: boolean
  },

  blocks: Block[]
}

export const definePageConfig = (options: PageConfigOptions) => options

export type DefinePageConfig = typeof definePageConfig

export type UnwrapPageConfigBlock<T extends Record<string, any>> = {
  _blockComponent: DefineComponent,
} & T
