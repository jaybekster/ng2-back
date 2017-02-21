'use strict';

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        autowatch: false,
        browsers: ['PhantomJS'],
        files: [{ pattern: './tests/karma.entry.js'}],
        phantomjsLauncher: {
            exitOnResourceError: true
        },
        preprocessors: {
            './tests/karma.entry.js': ['webpack']
        },
        singleRun: true,
        webpack: require('./webpack.test.config'),
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        }
    });
}
