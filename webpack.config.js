var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join( __dirname, 'dist' ),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin(
            'bundle.js.map', null,
            '[absolute-resource-path]', '[absolute-resource-path]' )
    ],
    module: {
        noParse: /node_modules\/quill\/dist/,
        loaders: [ {
            test: /\.js$/,
            loaders: [ 'react-hot', 'babel' ],
            include: path.join( __dirname, 'src' )
        } ]
    }
};
