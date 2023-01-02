import { rmdir } from 'fs/promises'
import { execp } from './../utils/exacp';

export const createVuesticAdmin = async (projectName: string) => {
  const outPath = `${process.cwd()}/${projectName}`
  const command = `git clone https://github.com/epicmaxco/vuestic-admin.git ${projectName}`

  await execp(command)
  await rmdir(`${outPath}/.git`, { recursive: true })
}
