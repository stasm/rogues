// vim: ts=2 et sts=2 sw=2

var net = require('net');
var World = require('./models/world').World;
var Server = require('./lib/server').Server;

var world = new World();
var server = new Server(world);
server.start();
