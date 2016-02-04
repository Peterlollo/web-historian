// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require( 'fs' );

archive.downloadSiteFile( (data) => {
  var current = {};
  var siteArray = [];
  if ( data ) current = JSON.parse( data );
  for(var site in current) {
    if( current[site] === false) siteArray.push(site); 
  } 
  archive.downloadUrls(siteArray, function( site ) {
    current[site] = true;
    var send = JSON.stringify( current );
    fs.writeFile( archive.paths.list, send );
  });
});

