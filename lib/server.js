// vim: ts=2 et sts=2 sw=2

var net = require('net');
var Player = require('../models/player').Player;

// @param {Number} port
var Server = exports.Server = function Server(port) {
  this.port = port || 8008;
  this.tcp = net.createServer(this.askForName.bind(this));
  this.players = [];
}

Server.prototype.start = function start() {
  this.tcp.listen(this.port);
}

// @param {String} message
Server.prototype.log = function log(message) {
  console.log('# ' + message)
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
  var player = new Player(socket, name.trim());
  this.addPlayer(player);
  this.showHelp(player);
}

// @param {models.Player} player
Server.prototype.addPlayer = function addPlayer(player) {
  this.players.push(player);
  player.server = this;
  player.enter(this.startingRoom);
  this.announce(player.name + ' has joined!');
}

// @param {models.Player} player
Server.prototype.removePlayer = function removePlayer(player) {
  this.players.splice(this.players.indexOf(player), 1);
  this.announce(player.name + ' has left!');
}

// @param {models.Player} player
Server.prototype.showHelp = function showHelp(player) {
  var help = 'Available commands: go, say, shout, radio';
  player.send('> ' + help);
}

// @param {String} message
// @param {models.Player} excluding
Server.prototype.broadcast = function broadcast(message, excluding) {
  for (var p, i=0; p = this.players[i]; i++) {
    if (p == excluding)
      continue
    p.send(message)
  }
}

// @param {String} message
Server.prototype.announce = function announce(message) {
  this.broadcast('> ' + message)
}
