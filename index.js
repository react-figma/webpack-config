const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

const path = require('path');

// Default Webpack configuration
// @see: https://webpack.js.org/configuration/
const baseConfig = {
    entry: {
        ui: './src/ui.tsx', // The entry point for your UI code
        code: './src/code.tsx' // The entry point for your plugin code
    },

    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },

            // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
            { test: /\.(png|jpg|gif|webp|zip)$/, type: 'asset/resource' },

            { test: /\.svg$/, type: 'asset/inline', }
        ]
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
        extensions: ['.figma.tsx', '.figma.ts', 'figma.jsx', '.figma.js', '.tsx', '.ts', '.jsx', '.js']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'dist'),
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: false,
            'REACT_FIGMA_EXPERIMENTAL': true,
            'REACT_FIGMA_STYLE_INHERITANCE_ENABLED': true,
            'REACT_FIGMA_WEB_DEFAULTS_ENABLED': true,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            // template: path.resolve('public/index.html'),
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]),
    ]
};

// Options that should only be applied in development builds:
const developmentConfig = {
    mode: 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: 'inline-source-map',
};

// Options that should only be applied in production builds:
const productionConfig = {
    mode: 'production',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: false,
};

// Export a `configure()` function for applications to
// import & extend in their `webpack.config.js` files.
module.exports = options => env => {
    const isProduction = env === 'production';
    const environmentConfig = isProduction ? productionConfig : developmentConfig;

    // Merge our base config, environment overrides, and per-app overrides.
    return merge(baseConfig, environmentConfig, options);
};
