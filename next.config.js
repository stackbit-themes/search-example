const sourcebit = require('sourcebit');
const sourcebitConfig = require('./sourcebit.js');
sourcebit.fetch(sourcebitConfig);

module.exports = {
    trailingSlash: true,
    webpack: (config) => {
        config.watchOptions.ignored.push('/content/');
        return config;
    }
};
