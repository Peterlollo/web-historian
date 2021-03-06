var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var utils = require( './http-helpers' );
var archive = require( '../helpers/archive-helpers' );

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  '/': handler.serveIndex,
  '/styles.css': handler.serveCSS
  //Dynamically add paths for sites that are archived
};

archive.readListOfUrls( ( sitesArray ) => {
  sitesArray.forEach( ( site )=>{
    addArchivedRoute( site );
  } );
} );

var server = http.createServer(function(request, response){
  if( routes[request.url] ) {
    routes[request.url](request, response);
  } else if( routes[ request.url.slice(1) ] ){
    routes[ request.url.slice(1) ](request, response);
  } else {
    utils.send404( response );
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

exports.addArchivedRoute = addArchivedRoute = ( route ) => {
  routes[route] = handler.handleRequest;
};
