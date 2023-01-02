import { execp } from './../utils/exacp';

type CreateVueFeature = 'ts' | 'jsx' | 'router' | 'pinia' | 'tests' | 'vitest' | 'cypress' | 'playwright' | 'eslint'

export const createVue = async (projectName: string, features: CreateVueFeature[]) => {
  // TODO: Check if project name already exists
  const argsString = features
    .map((feature) => `--${feature}`)
    .join(' ')

  const command = `npm create vue@3 --yes -- --default ${argsString} ${projectName} --force`

  return execp(command)
}
