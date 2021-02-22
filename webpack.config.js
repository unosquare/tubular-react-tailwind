const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
    const isDevBuild = options.mode !== 'production';
    const config = {
        entry: ['./src/index.tsx'],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
                chunkFilename: 'styles.css',
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"'
            }),
        ],
    };

    if (isDevBuild) {
        config.entry.push('./sample/index.tsx');
        config.devtool = 'inline-source-map';
        config.plugins.push(
            new HtmlWebpackPlugin({
                title: 'My App',
                template: './index.html',
            }),
        );
    }

    return config;
};
