const jtab = require("jtab")
const Entities = require('html-entities').AllHtmlEntities;
const htmlentities = new Entities().encode;
export default function () {
    return {
        plugin: function (markdownIt, _options) {
            const defaultRender = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) {
                return self.renderToken(tokens, idx, options, env, self);
            };

            markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
                const token = tokens[idx];
                if (token.info !== 'jtab') return defaultRender(tokens, idx, options, env, self);

                const element = document.createElement('div');

                let html = "";
                try {
                    document.body.appendChild(element);
                    jtab.render(element, token.content);
                    html = '<div class="jtab chordonly">' + element.innerHTML + '</div>';
                } catch (error) {
                    console.error(error);
                    return '<div style="border: 1px solid red; padding: 10px;">Could not render JTAB notation: ' + htmlentities(error.message) + '</div>';
                } finally {
                    document.body.removeChild(element);
                }

                return html;
            };
        },

        assets: function () {
            return [
                {
                    name: "./jtab.css"
                },
            ];
        },
    }
}