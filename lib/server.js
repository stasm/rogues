// vim: ts=2 et sts=2 sw=2

var net = require('net');
var Player = require('../models/player').Player;

// @param {models.World} world
// @param {Number} port
var Server = exports.Server = function(world, port) {
  this.world = world;
  this.port = port || 8008;

  var self = this;
  this.tcp = net.createServer(function (socket) {
    socket.write('> What will your name be today?\r\n');
    socket.once('data', function (buffer) {
      var name = buffer.toString('utf8').trim();
      var player = new Player(socket, name, self.world);
    });
  });
}

Server.prototype.start = function() {
  this.tcp.listen(this.port);
}
