export const insertImport = (source: string, imports: string[]) => {
  const lines = source.split('\n')
  const importString = imports.join('\n')

  const lastImportIndex = lines.findLastIndex(line => line.match(/^import/))

  if (lastImportIndex === -1) {
    return importString + '\n' + source
  }

  const insertionIndex = lastImportIndex + 1
  return [...lines.slice(0, insertionIndex), importString, ...lines.slice(insertionIndex)].join('\n')
}
