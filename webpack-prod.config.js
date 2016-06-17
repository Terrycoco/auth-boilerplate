// ------- WEBPACK PRODUCTION CONFIG -------
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css', { allChunks: true});
var extractLESS = new ExtractTextPlugin('[name].less', { allChunks: true});

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/entry.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        extractCSS,
        extractLESS

    ],

      resolve: {
        alias: {
            components:   path.resolve(__dirname, 'src', 'components'),
            reducers:     path.resolve(__dirname, 'src', 'reducers'),
            actions:      path.resolve(__dirname, 'src', 'actions'),
            styles:       path.resolve(__dirname, 'src', 'styles'),
            images:       path.resolve(__dirname, 'src', 'images'),
            pages:        path.resolve(__dirname, 'src', 'pages'),
            lib:          path.resolve(__dirname, 'src', 'lib'),
            utils:        path.resolve(__dirname, 'src', 'utils'),
            examples:     path.resolve(__dirname, 'src', 'examples')
        },
        extensions: ['', '.js','.jsx', '.css', '.png', '.less']
      }, 

    module: {
        loaders: [
            { test: /\.jsx$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            },
            { test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/

            },
            { test: /\.css$/i, 
                loader: extractCSS.extract('css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader')
            },
            { 
              test: /\.less$/i,
                loader: extractLESS.extract('css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!less-loader')
            },
            { test: /\.png$/,
                loader: "url-loader?limit=10000&minetype=image/jpg"
            }
        ]
    },

   

}
