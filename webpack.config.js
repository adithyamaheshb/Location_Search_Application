var webpack = require("webpack");
var path = require("path");

module.exports = {

    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    devtool: '#source-map',
       module: {
        loaders: [
            {
                test: [/\.js$/, /\.es6$/],
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query:{
                    presets:['react', 'es2015']
                }
            }
        ]
    }
}
