// vim: ts=2 et sts=2 sw=2

var net = require('net');
var Player = require('../models/player').Player;

// @param {models.World} world
// @param {Number} port
var Server = exports.Server = function Server(world, port) {
  this.world = world;
  this.port = port || 8008;
  this.tcp = net.createServer(this.askForName.bind(this));
}

Server.prototype.start = function start() {
  this.tcp.listen(this.port);
}

// @param {net.Socket} socket
Server.prototype.askForName = function askForName(socket) {
  // emit Strings, not Buffers
  socket.setEncoding('utf8');
  socket.write('> What will your name be today?\r\n');
  socket.once('data', this.createPlayer.bind(this, socket));
}

// @param {net.Socket} socket
// @param {String} name
Server.prototype.createPlayer = function createPlayer(socket, name) {
  var player = new Player(socket, name.trim(), this.world);
}
