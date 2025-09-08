import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"
import { useFiles } from '../composables/useFiles';
import { useNuxt } from '../composables/useNuxt';
import { addVitePlugin } from '../utils/add-vite-plugin';

const installInVite = async () => {
  const { resolveCorrectExt, replaceFileContent } = await useFiles()

  const css = resolveCorrectExt('src/assets/main', ['css', 'scss', 'sass'])

  return Promise.all([
    replaceFileContent(css!, (content) =>
      content.replace("@import './base.css';", `
@import './base.css';
@import "tailwindcss";
`.trim())
    ),
    replaceFileContent(resolveCorrectExt('vite.config', ['ts', 'js'])!, async (content) =>
      await addVitePlugin(content, {
        name: 'tailwindcss',
        from: '@tailwindcss/vite',
        named: false,
      })
    ),
  ])
}

const installInNuxt = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const { nuxtConfig, pathPrefix } = await useNuxt()

  return Promise.all([
    addFile(`${pathPrefix}assets/css/main.css`, `
@import "tailwindcss";

`.trimStart()
    ),
    replaceFileContent(nuxtConfig!, (content) => {
      content = `import tailwindcss from "@tailwindcss/vite";\n` + content

      content = content.replace('export default defineNuxtConfig({', `
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
`)

      return content.trim()
    }),
  ])
}

export const addTailwind = async (options: UserAnswers) => {
  const { vuesticFeatures, projectType } = options
  if (vuesticFeatures && !vuesticFeatures.includes('tailwind')) {
    return
  }

  const { addDependencies } = await usePackageJson()

  if (projectType === 'nuxt') {
    await installInNuxt()
  } else if (projectType === 'create-vue') {
    await installInVite()
  }

  await Promise.all([
    addDependencies({
      devDependencies: {
        tailwindcss: versions['tailwindcss'],
        '@tailwindcss/vite': versions['@tailwindcss/vite'],
      }
    }),
  ])
}
