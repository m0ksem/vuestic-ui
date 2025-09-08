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

    const intent = lines[pluginsLineIndex + 1].match(/^\s*/)?.[0] || '';

    if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, `${intent}${plugin.name}(),`);
        return lines.join('\n');
    }

    return viteConfigSource;
}
