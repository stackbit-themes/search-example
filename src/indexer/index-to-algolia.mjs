import sourcebit from 'sourcebit';
import sourcebitConfig from '../../sourcebit.js';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { marked } from 'marked';
import PlainTextRenderer from './markdown-plaintext.mjs';
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_INDEX_NAME = (process.env.NODE_ENV || 'development') + '_' + process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
if (!ALGOLIA_APP_ID || !ALGOLIA_INDEX_NAME || !ALGOLIA_ADMIN_API_KEY)
    throw Error('Algolia config missing. Use your force, read the source.');
console.log('Aloglia index name:', ALGOLIA_INDEX_NAME);

marked.use({ gfm: true });
const mdLexer = new marked.Lexer();
const mdPlainTextRenderer = new PlainTextRenderer({ spaces: true });

async function getJamstackThemes() {
    console.log('Loading data...');
    await sourcebit.fetch(sourcebitConfig);
    const allContent = await sourcebitDataClient.getData();

    let themes = allContent.objects.filter((content) => content.layout === 'JamstackTheme');
    themes = themes.filter((theme) => !theme.disabled);
    console.log(`Found ${themes.length} Jamstack themes`);
    return themes;
}

const githubEmojiRegex = /\:\w+\:/g;

function buildObjectsToIndex(themes) {
    console.log('Preparing data for indexing...');
    const objectsToIndex = themes.map((theme) => {
        let { __metadata, layout, description, markdown_content, ...o } = theme;
        o.objectID = theme.__metadata.id;
        o.url = __metadata.urlPath;
        o.type = theme.layout;
        o.description = description ? description.replace(githubEmojiRegex, '').trim() : null;
        if (theme.markdown_content) {
            const { heading, body } = parseMarkdown(theme.markdown_content);
            o.contentHeading = heading;
            o.contentBody = body;
        }
        return o;
    });
    return objectsToIndex;
}

function parseMarkdown(markdown) {
    const body = marked(markdown, { renderer: mdPlainTextRenderer });
    let heading = null;
    const tokens = mdLexer.lex(markdown);
    for (let token of tokens) {
        if (token.type === 'heading' && token.depth === 1) {
            heading = token.text;
            break;
        }
    }
    return { heading, body };
}

async function indexObjects(objectsToIndex) {
    console.log('Indexing...');
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    const response = await index.saveObjects(objectsToIndex);
    await index.setSettings({
        searchableAttributes: [
            'title',
            'description',
            'ssg',
            'cms',
            'author',
            'contentHeading',
            'contentBody',
            'github',
            'demo',
            'date'
        ],
        customRanking: ['desc(date)']
    });

    console.log(`Indexed ${response.objectIDs.length} objects`);
}

console.time('Total time');
const themes = await getJamstackThemes();
const objectsToIndex = buildObjectsToIndex(themes);
await indexObjects(objectsToIndex);
console.timeEnd('Total time');
