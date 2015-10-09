var Hapi = require('hapi');
var routes = require('./routes/index');

var config = {};
var server = new Hapi.Server('127.0.0.1', 8000, config);

server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {
  if (err) {
    console.log('Failed loading plugins');
  }
});

server.addRoutes(routes);
server.start();