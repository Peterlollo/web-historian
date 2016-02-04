var fs = require( 'fs' );
var path = require( 'path' );
var _ = require( 'underscore' );
var http = require( 'http' );
var urlParse = require( 'url' );

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.downloadSiteFile = function(callback) {
  fs.readFile( paths.list, 'utf-8', function( err, data ) {
    if( err ) {
      throw new Error( 'Failed to read sites.txt' );
    }
   callback( data );
  } );
};


exports.readListOfUrls = function( callback ) {
  //Take the object from download URLs
    return exports.downloadSiteFile(function(data) {
      var sitesObj;
      var sitesArray = [];
      if( data ) { 
        sitesObj = JSON.parse( data );
    // convert into array
        sitesArray = Object.keys( sitesObj );
        }
      callback( sitesArray );
      return sitesArray;
    });
};

exports.isUrlInList = function(targetUrl, callback) {
  var flipflop = function( target, array ) {
    var result = _.contains( array, target );
    if( callback ) {
      result = callback( result );
    }
    return result;
  };
  return exports.readListOfUrls( flipflop.bind( null, targetUrl ) );
};

exports.addUrlToList = function(newUrl, callback) {    
  exports.downloadSiteFile(function(data) {
    var current = {};
    if( data ) current = JSON.parse( data );
    current[newUrl] = false;
    current = JSON.stringify( current );
    fs.writeFile( paths.list, current, function(err, data) {
      if(err) throw new Error ('Failed to write new url to sites.txt');
      if( callback ) data = callback( data );
      return data;
    });
  });
};

exports.isUrlArchived = function(targetUrl, callback) {
  //downloadURLs
  return exports.downloadSiteFile(function(data){
    var sitesObject = JSON.parse( data );
    var result = sitesObject[ targetUrl ];
    callback( result );
    return result;
  });
  //check whether targetURL is true or false
};

exports.downloadURL = function () {
  //read a given site
};

exports.downloadUrls = function( arrayOfSites, callback ) {

  var doTheThing = ( site ) => {
    var httpSite = 'http://' + site;
    http.get( httpSite, ( res ) => {
      console.log( `Got response: ${res.statusCode}` );
      var body = '';
      res.on( 'data', function( chunk ) {
        body += chunk;
      } );
      res.on('end', function(){
        fs.writeFile( path.join( paths.archivedSites, './' + site ), body, function( err, data ) {
          if( err ) throw new Error( 'Error in writing new site to archive' );
          if ( callback ) callback( site );
        } );
      } );
    } );
  };

  arrayOfSites.forEach( function( site ) {
    doTheThing( site );
  } );
};
