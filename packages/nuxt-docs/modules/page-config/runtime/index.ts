import { DefineComponent } from 'vue'
import example from '../blocks/example'
import title from '../blocks/title'
import paragraph from '../blocks/paragraph'
import subtitle from '../blocks/subtitle'

export const block = {
  example,
  title,
  paragraph,
  subtitle,
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
