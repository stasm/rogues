// vim: ts=2 et sts=2 sw=2

var net = require('net');
var Area = require('./models/area').Area;
var Server = require('./lib/server').Server;

var area = new Area();
var room = new Area(area);
var server = new Server();
server.startingRoom = room;
server.start();
