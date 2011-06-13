// vim: ts=2 et sts=2 sw=2

// @param {net.Socket} socket
// @param {String} name
// @param {models.World} world
var Player = exports.Player = function Player(socket, name, world) {
  this.socket = socket;
  this.name = name || "Anonymous Coward";
  this.world = world;
  this.world.addPlayer(this);

  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this));
}

// @param {String} message
Player.prototype.send = function send(message) {
  this.socket.write(message.trim() + '\r\n');
}

// @param {String} message
Player.prototype.broadcast = function broadcast(message) {
  this.world.broadcast(message, this);
}

// @param {String} string
Player.prototype.onData = function onData(string) {
  var message = string.trim();
  this.broadcast(this.name + ' says: ' + message);
  this.send('you say: ' + message);
}

Player.prototype.onEnd = function onEnd() {
  this.world.removePlayer(this);
}
