var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  '/': handler.serveIndex,
  '/post': '',//Serve page that allows users to ask for new content,
  '/styles.css': handler.serveCSS
  //Dynamically add paths for sites that are archived
};

var server = http.createServer(function(request, response){
  if( routes[request.url] ) {
    routes[request.url](request, response);
  } else {
    //return 404
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

