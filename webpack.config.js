var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = function () {
    return {
        entry: './src/main.ts',
        // entry: {
        //     'app': './src/main.ts',
        //     'polyfills': './src/polyfills.ts'
        // },
        // optimization: {
        //     runtimeChunk: false,
        //     splitChunks: {
        //         chunks: "initial",
        //         cacheGroups: {
        //             default: false,
        //             vendors: false,
        //         },
        //     },
        // },
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
            chunkFilename: '[id].[chunkhash].js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },

        module: {
            rules: [
                {test: /\.ts$/, loaders: ['@ngtools/webpack']},
                { test: /\.css$/, loader: 'raw-loader' },
                { test: /\.html$/, loader: 'raw-loader' }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets'},
            ]),
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                output: __dirname + '/dist',
                inject: 'head'
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new AngularCompilerPlugin({
               tsConfigPath: './tsconfig.json',
               entryModule: './src/app/app.module#AppModule',
               sourceMap: true
            })
        ]
    };
}