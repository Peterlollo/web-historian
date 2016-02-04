var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var utils = require( './http-helpers' );

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

var server = http.createServer(function(request, response){
  // if(request.method === 'POST' ){
  //   console.log('POSTING! from this url: ', request.url);
  // } 
  if( routes[request.url] ) {
    routes[request.url](request, response);
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

exports.addArchivedRoute = ( route ) => {
  routes[route] = handler.handleRequest;
};