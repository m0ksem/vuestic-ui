import { VUESTIC_LOGO, APP_TEMPLATE } from './files-content';
import { useFiles } from '../../composables/useFiles';


export const restructureProject = async () => {
  const { addFile, replaceFileContent, isFileExists } = await useFiles()

  const appVuePath = isFileExists('app.vue') ? 'app.vue' : isFileExists('app/app.vue') ? 'app/app.vue' : null

  await Promise.all([
    addFile('assets/logo.svg', VUESTIC_LOGO),
    appVuePath ? replaceFileContent(appVuePath, () => APP_TEMPLATE) : null
  ])
}
