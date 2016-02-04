var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
exports.downloadUrls = function() {};

exports.downloadSitesFile = function() {
  //read the file given at paths.list
  fs.readFile( paths.list, function( err, data ) {
    if( err ) {
      throw new Error( 'Failed to read sites.txt' );
    }
    //Use JSON.parse and return the object
    return JSON.parse( data );
  } );

};

exports.readListOfUrls = function( callback ) {
  //Take the object from download URLs
    fs.readFile( paths.list, 'utf-8', function( err, data ) {
    if( err ) {
      throw new Error( 'Failed to read sites.txt' );
    }
    var sitesObj = JSON.parse( data );
    // convert into array
    var sitesArray = Object.keys( sitesObj );
    callback( sitesArray );
  } );


  //return an array containing the url items
};

exports.isUrlInList = function(targetUrl) {
  //read the url list and use _contains to check if targetURL is present
};

exports.addUrlToList = function(newUrl) {
  //download URLs 
  //append new key to object with false value
  //stringify object
  //rewrite sites.text with new stringified object
};

exports.isUrlArchived = function(targetUrl) {
  //downloadURLs 
  //check whether targetURL is true or false
};

exports.downloadURL = function () {
  //read a given site
};