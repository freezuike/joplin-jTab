import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
    onStart: async function () {
        await joplin.contentScripts.register(
            ContentScriptType.MarkdownItPlugin,
            'jtab',
            './jtab.js'
        );

        await joplin.contentScripts.onMessage('jtab', (message: any) => {
            return message + '+response';
        });
    },
});
