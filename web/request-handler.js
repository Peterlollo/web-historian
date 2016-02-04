var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var _ = require( 'underscore' );
// require more modules/folders here!

exports.serveIndex = function (req, res) {
  var assetPath = path.join( archive.paths.siteAssets, './index.html' );
  utils.serveAssets( res, assetPath );
};

exports.serveCSS = function( req, res ) {
  var assetPath = path.join( archive.paths.siteAssets, './styles.css' );
  utils.serveAssets( res, assetPath, _.identity, 'text/css' );
};

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};
