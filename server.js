// vim: ts=2 et sts=2 sw=2

var net = require('net');
var delegate = require('./lib/delegate');

var Area = require('./models/area').Area;
var Room = require('./models/room').Room;
var Server = require('./lib/server').Server;

var area = new Area();
var r1 = new Room(area);

var server = new Server();
server.startingRoom = r1;
server.start();
