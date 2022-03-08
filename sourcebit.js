const path = require('path');
const { flattenMarkdownData, urlPathFromFilePath, setEnvironmentVariables } = require('./src/utils/page-utils');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev,
                sources: [
                    { name: 'pages', path: path.join(__dirname, 'content/pages') },
                    { name: 'data', path: path.join(__dirname, 'content/data') }
                ]
            }
        },
        flattenMarkdownData(),
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                commonProps: (objects) => {
                    const site = objects.find((page) => page.type === 'Config');
                    return { site };
                },
                pages: (objects) => {
                    const pageObjects = objects.filter((page) => page.__metadata.sourceName === 'pages');
                    const pages = pageObjects.map((page) => {
                        let res = { ...page };
                        res.__metadata.urlPath = urlPathFromFilePath(page.__metadata.relSourcePath);
                        return res;
                    });
                    return pages;
                }
            }
        }
    ]
};
