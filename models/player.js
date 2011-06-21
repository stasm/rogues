// vim: ts=2 et sts=2 sw=2

var Parser = require('../lib/parser').Parser;
var reverse = require('./room').reverse;

// @param {net.Socket} socket
// @param {String} name
// @param {lib.Server} server
// @param {models.Area} room
var Player = exports.Player = function Player(socket, name) {
  this.server = null;
  this.socket = socket;
  this.parser = new Parser(this);
  this.name = name || "Anonymous Coward";

  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this));
}

// @param {models.Area} room
// @param {String} direction
Player.prototype.enter = function enter(room, direction) {
  if (this.room) {
    this.room.removePlayer(this);
    if (direction) {
      this.room.broadcast(this.name + ' has left to the ' + direction, this);
      this.send('You go ' + direction);
    }
  }
  this.room = room;
  this.room.addPlayer(this);
  if (direction)
    this.room.broadcast(this.name + ' has arrived from the ' + reverse(direction), this);
}

// @param {String} direction
Player.prototype.go = function go(direction) {
  var dest = this.room.exits[direction];
  if (dest === undefined) {
    this.send("Unknown direction");
    return;
  }
  if ( ! dest) {
    this.send("You cannot go in this direction!");
    return;
  }
  if ( ! dest.addPlayer) {
    this.server.log("The destination is not a valid room");
    return;
  }
  this.enter(dest, direction);
}

// @param {String} message
Player.prototype.send = function send(message) {
  this.socket.write(message.trim() + '\r\n');
}

// @param {String} message
Player.prototype.broadcast = function broadcast(message) {
  this.send('you radio: ' + message);
  var chars = message.split('');
  chars.splice(0, 4, '...kshhh...');
  chars.splice(12, 4, '...kshhh...');
  message = chars.join('');
  message = this.name + ' radios: ' + message;
  this.server.broadcast(message, this);
}

// @param {String} message
Player.prototype.shout = function shout(message) {
  this.send('you shout: ' + message);
  message = message.toUpperCase();
  message = this.name + ' shouts: ' + message;
  this.room.area.broadcast(message, this);
}

// @param {String} message
Player.prototype.say = function say(message) {
  this.send('you say: ' + message);
  var message = this.name + ' says: ' + message;
  this.room.broadcast(message, this);
}

// @param {String} command
Player.prototype.parse = function parse(command) {
  this.parser.parse(command);
}

// @param {String} string
Player.prototype.onData = function onData(string) {
  var command = string.trim();
  this.parse(command);
}

Player.prototype.onEnd = function onEnd() {
  this.server.removePlayer(this);
}
