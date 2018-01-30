const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = [];

plugins.push(new ExtractTextPlugin('styles.css'));
plugins.push(new webpack.ProvidePlugin({
    '$' : 'jQuery/dist/jquery.js',
    'jQuery' : 'jQuery/dist/jquery.js'
}));

if (process.env.NODE_ENV === 'production') {
    plugins.push(new BabiliPlugin());

    plugins.push(new OptimizeCssAssetsPlugin({
        cssProcessor : require('cssnano'),
        cssProcessorOptions : {
            discardComments : {
                removeAll : true
            }
        },
        canPrint : true
    }))
}

module.exports = {
    entry : './app-src/app.js',
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist'),
        publicPath : 'dist'
    },
    module : {
        rules : [{
            test : /\.js$/,
            exclude : /node_modules/,
            use : {
                loader : 'babel-loader'
            }
        }, {
            test : /.css$/,
            use : ExtractTextPlugin.extract({
                fallback : 'style-loader',
                use : {
                    loader : 'css-loader'
                }
            })
        }, { 
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
        }, { 
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, { 
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'file-loader' 
        }, { 
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
        }]
    },
    plugins
};