// vim: ts=2 et sts=2 sw=2

// @param {net.Socket} socket
// @param {String} name
// @param {lib.Server} server
// @param {models.Area} room
var Player = exports.Player = function Player(socket, name) {
  this.socket = socket;
  this.name = name || "Anonymous Coward";

  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this));
}

// @param {models.Area} room
Player.prototype.enter = function enter(room) {
  if (this.room)
    this.room.removePlayer(this);
  this.room = room;
  this.room.addPlayer(this);
}

// @param {String} message
Player.prototype.send = function send(message) {
  this.socket.write(message.trim() + '\r\n');
}

// @param {String} message
Player.prototype.broadcast = function broadcast(message) {
  this.server.broadcast(message, this);
}

// @param {String} message
Player.prototype.shout = function shout(message) {
  this.room.area.broadcast(message, this);
}

// @param {String} message
Player.prototype.say = function say(message) {
  this.room.broadcast(message, this);
}

// @param {String} string
Player.prototype.onData = function onData(string) {
  var message = string.trim();
  this.say(this.name + ' says: ' + message);
  this.send('you say: ' + message);
}

Player.prototype.onEnd = function onEnd() {
  this.server.removePlayer(this);
}
