var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require( 'underscore' );

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function( res, asset, callback, contentType ) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  fs.readFile( asset, function( err, data ) {
    if( err ) {
      var options = {};
      options.statusCode = 500;
      sendResponse( res, null, options );
      // send a 500 response if we cannot load the file
      throw new Error( 'Could not read file in http-helpers.serveAssets' );
    }
    if( callback ) {
      data = callback( data );
    }
    if( contentType ) {
      sendResponse( res, data, { contentType: contentType } );
    }
    sendResponse( res, data );
  } );

};


exports.sendResponse = sendResponse = function ( res, data, options ) {
  options = options || {};
  options.statusCode = options.statusCode || 200;
  var newHeaders = {};
  if( options.contentType ) newHeaders['Content-Type'] = options.contentType;
  _.defaults( newHeaders, headers );
  console.log( options );
  res.writeHead( options.statusCode, newHeaders );
  res.end(data);
};

exports.redirect = ( res, site, status ) => {
  var status = status || 302;
  var header = {
    location: site
  };
  res.writeHead( status, header );
  res.end();
};

exports.send404 = function( res ) {
    var options = {};
    options.statusCode = 404;
    sendResponse( res, '404! Not found', options );
};
// As you progress, keep thinking about what helper functions you can put here!
