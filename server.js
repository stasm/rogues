var net = require('net'),
    Server = require('./lib/server').Server,
    World = require('./models/world').World;

var world = new World();
var server = new Server(world);
server.start();
