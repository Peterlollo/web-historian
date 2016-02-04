var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var _ = require( 'underscore' );
var server = require( './basic-server' );
// require more modules/folders here!

exports.serveIndex = function (req, res) {
  var INDEX = './index.html';
  var LOADING = './loading.html';
  var serve = ( asset ) => {
    var assetPath = path.join( archive.paths.siteAssets, asset );
    utils.serveAssets( res, assetPath );
  };
  if( req.method === 'GET' ) {
    serve( INDEX );
  } else if ( req.method === 'POST' ) {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
      console.log('req.on : ', body);
    });
    req.on('end', function() {
      console.log('first body : ', body);
      body = '' + body;
      console.log('second body : ', body);
      //body = JSON.parse( body );
      var url = body.substr(4);
      console.log('url : ', url);
      archive.isUrlInList( url, function( inTheList ) {
        if( inTheList ) {
          archive.isUrlArchived( url, function ( isArchived ) {
            if( isArchived ) {
              // redirect to completed page
              var options = {};
              options.statusCode = 302;
              utils.sendResponse( res, '/' + url, options );
            } else {
              serve( LOADING );
            }
          });
        } else {
          // thing is not in the list
          // add it to the list
          archive.addUrlToList( url );
          // add a route for it
          server.addArchivedRoute( '/' + url );
          // serve the loading page
          serve( LOADING );
        }
      } );      
    });
  } else {
    utils.send404( res );
  }
};

exports.serveCSS = function( req, res ) {
  var assetPath = path.join( archive.paths.siteAssets, './styles.css' );
  utils.serveAssets( res, assetPath, _.identity, 'text/css' );
};

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};
