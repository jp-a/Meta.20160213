var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var config = require( './webpack.config' );

new WebpackDevServer( webpack( config ), {
    publicPath: '/dist/',
    hot: true,
    historyApiFallback: true
} ).listen( 3000, 'localhost', function ( err, result ) {
    if ( err ) {
        console.log( err );
    }

    console.log( 'Listening at localhost:3000' );
} );

// https://github.com/pgte/pouch-websocket-sync

const http = require( 'http' );
const PouchDB = require( 'pouchdb' );
const PouchSync = require( 'pouch-websocket-sync' );

const server = http.createServer();
const wss = PouchSync.createServer( server, onRequest );

wss.on( 'error', function ( err ) {
    console.error( err.stack );
} );

const db = new PouchDB( 'nodes-server' );

server.listen( 3010, function () {
    console.log( (new Date()) + ' Server is listening on', server.address() );
} );

function onRequest( credentials, dbName, callback ) {
    if ( dbName == 'nodes-server' ) {
        callback( null, db );
    } else {
        callback( new Error( 'database not allowed' ) );
    }
}
