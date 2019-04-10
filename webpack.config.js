/*
 * @Author: Yzed 
 * @Date: 2019-04-08 19:22:45 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-08 19:46:36
 */

const path = require('path')
const ExtractTextPlugin   = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

let getHtmlConfig = function(name,title){
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        title: title,
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}

const config = {
    mode : 'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry: {
        test    : './src/page/test',
        common  : './src/page/common/common',
        index   : './src/page/index/index'
    },
    output: {
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.operations.com/operations/dist/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'source-map',
    devServer: {
        port: 8090,
        overlay: true,
        inline: true
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve: {
        alias: {
            node_modules    : __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 针对js结尾的文件设置LOADER
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname,'./src')],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // 模板文件的处理
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize : true,
                        removeAttributeQuotes : false
                    }
                }
            }   
        ]
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        //清理dist
        new CleanWebpackPlugin(['dist']),
         // 把css单独打包到文件里
         new ExtractTextPlugin("css/[name].css"),
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NamedModulesPlugin(),
         //生成html
         new HtmlWebpackPlugin(getHtmlConfig('index', '在线测试'))
    ]
}

module.exports = config