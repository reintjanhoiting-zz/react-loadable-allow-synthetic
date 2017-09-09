const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');
const PUBLIC_PATH = 'https://www.my-domain.com/';

function isProduction() {
    return process.env.NODE_ENV == 'production';
}

module.exports = {
    context: path.resolve(__dirname, "src"),

    entry: {
        app: './index.tsx'
    },

    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },
    plugins: (function () {
        const plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),
            new CheckerPlugin(),
            new HtmlWebpackPlugin({
                title: 'PWA',
                template: './../public/index.ejs'
            })
        ];

        if (isProduction()) {
            plugins.push(new UglifyJSPlugin())

            plugins.push(new SWPrecacheWebpackPlugin(
                {
                    cacheId: 'my-project-name',
                    dontCacheBustUrlsMatching: /\.\w{8}\./,
                    filename: 'service-worker.js',
                    minify: true,
                    logger(message) {
                        if (message.indexOf('Total precache size is') === 0) {
                            // This message occurs for every build and is a bit too noisy.
                            return;
                        }
                        console.log(message);
                    },
                    navigateFallback: PUBLIC_PATH + 'index.html',
                    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
                }
            ));

            plugins.push(new WebpackPwaManifest({
                name: 'My Applications Friendly Name',
                short_name: 'Application',
                description: 'Description!',
                background_color: '#01579b',
                theme_color: '#01579b',
                'theme-color': '#01579b',
                start_url: '/',
                icons: [
                    {
                        src: path.resolve('./src/images/icon.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons')
                    }
                ]
            }));
        }
        return plugins;
    })()
};