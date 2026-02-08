import { insertImport } from "./insert-import";

export async function addVitePlugin(viteConfigSource: string, plugin: {
  name: string,
  from: string,
  named?: boolean
}): Promise<string> {
    const importName = plugin.named ? `{ ${plugin.name} }` : plugin.name;

    viteConfigSource = insertImport(viteConfigSource, [`import ${importName} from "${plugin.from}"`]);
    const lines = viteConfigSource.split('\n');
    const pluginsLineIndex = lines.findIndex(line => line.includes('plugins:'));
    if (pluginsLineIndex === -1) {
        // TODO: Handle case when plugins array is not found. For now, we expect create-vue adds vue plugin with plugins array.
        return viteConfigSource;
    }

    let insertIndex = -1;
    let bracketBalance = 0;

    for (let i = pluginsLineIndex; i < lines.length; i++) {
        const line = lines[i];
        bracketBalance += (line.match(/\[/g)?.length || 0);
        bracketBalance -= (line.match(/\]/g)?.length || 0);

        if (bracketBalance > 0 && line.trim().endsWith('[')) {
            insertIndex = i + 1;
            break;
        }
    }

    const indentSourceLine = lines[pluginsLineIndex + 1] ?? lines[pluginsLineIndex];
    const intent = indentSourceLine.match(/^\s*/)?.[0] || '';

    if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, `${intent}${plugin.name}(),`);
        return lines.join('\n');
    }

    return viteConfigSource;
}
