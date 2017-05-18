const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/www',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './www',
        proxy: {
            '/api': {
                target: 'http://localhost:3003',
                secure: false
            }
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ],
    devtool: 'source-map',
    module: {
        loaders:[{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread', 'transform-decorators-legacy', 'transform-class-properties']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            loader: 'file'
        }]
    }
}