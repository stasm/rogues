// vim: ts=2 et sts=2 sw=2

var World = exports.World = function World() {
  this.players = [];
}

// @param {models.Player} player
World.prototype.addPlayer = function addPlayer(player) {
  this.players.push(player);
  this.announce(player.name + ' has joined!');
}

// @param {models.Player} player
World.prototype.removePlayer = function removePlayer(player) {
  this.players.splice(this.players.indexOf(player), 1);
  this.announce(player.name + ' has left!');
}

// @param {String} message
// @param {models.Player} excluding
World.prototype.broadcast = function broadcast(message, excluding) {
  for (var p, i=0; p = this.players[i]; i++) {
    if (p == excluding)
      continue
    p.send(message)
  }
}

// @param {String} message
World.prototype.announce = function announce(message) {
  this.broadcast('> ' + message)
}
