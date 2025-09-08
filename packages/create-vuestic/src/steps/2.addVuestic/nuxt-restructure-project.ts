import { VUESTIC_LOGO, APP_TEMPLATE } from './files-content';
import { useFiles } from '../../composables/useFiles';
import { useNuxt } from '../../composables/useNuxt';


export const restructureProject = async () => {
  const { addFile, replaceFileContent } = await useFiles()

  const { pathPrefix } = await useNuxt()
  await Promise.all([
    addFile(`${pathPrefix}assets/logo.svg`, VUESTIC_LOGO),
    replaceFileContent(`${pathPrefix}app.vue`, () => APP_TEMPLATE)
  ])
}
