const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();


/*app.use('/v2', proxy({
    target: 'https://api.douban.com/', 
    changeOrigin: true
}));*/

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

/*const apiProxy = proxy('/api', { target: 'http://www.xbwl.cn',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/api/*', apiProxy);//api子目录下的都是用代理*/
/*app.use('/api/*', proxy({
    target: "http://www.xbwl.cn",
    changeOrigin: true
}));*/



module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ],
    devServer: {
        port: 8081,
        proxy: {
          '/api': {
            target: ' https://easy-mock.com/mock/59e061bbe2fd4e67507fab05/mytest',
            pathRewrite: {'^/api' : '/api'},
            changeOrigin: true
          }
        }
    }
});