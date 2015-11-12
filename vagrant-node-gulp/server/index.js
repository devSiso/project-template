'use strict';

var Hapi = require('hapi');
var routes = require('./routes');

var server = new Hapi.Server();
server.connection({
  host: '127.0.0.1',
  port: 8000
});

server.route(routes);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});