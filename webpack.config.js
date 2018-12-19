var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,

    entry: './gradebooks/static/js/index',

    output: {
        path: path.resolve('./gradebooks/static/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractText({
            filename: '[name]-[hash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['url-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }

};