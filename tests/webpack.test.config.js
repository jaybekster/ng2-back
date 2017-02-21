'use strict';

const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        )
    ],
    module: {
        rules: [
            { loader: 'raw-loader', test: /\.html$/ },
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
            { test: /\.json$/, loader: 'json-loader' },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        modules: [__dirname, 'node_modules']
    }
};
