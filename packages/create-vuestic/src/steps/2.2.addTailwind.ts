import { versions } from './../versions';
import { UserAnswers } from './../prompts';
import { usePackageJson } from "../composables/usePackageJson"
import { useFiles } from '../composables/useFiles';
import { useNuxt } from '../composables/useNuxt';

const installInVite = async () => {
  const { addFile, resolveCorrectExt, replaceFileContent } = await useFiles()

  const css = resolveCorrectExt('src/assets/main', ['css', 'scss', 'sass'])

  return Promise.all([
    addFile('tailwind.config.mjs', `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}
`.trim()),
    addFile('postcss.config.mjs', `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`.trim()),
    replaceFileContent(css!, (content) =>
      content.replace("@import './base.css';", `
@import './base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim())
    )
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
