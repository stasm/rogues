var World = exports.World = function() {
    this.players = [];
}

// @param {models.Player} player
World.prototype.addPlayer = function(player) {
    this.players.push(player);
    this.announce(player.name + ' has joined!');
}

// @param {models.Player} player
World.prototype.removePlayer = function(player) {
    this.players.splice(this.players.indexOf(player), 1);
    this.announce(player.name + ' has left!');
}

// @param {String} message
// @param {models.Player} excluding
World.prototype.broadcast = function(message, excluding) {
    for (var p, i=0; p = this.players[i]; i++) {
        if (p == excluding)
            continue
        p.send(message)
    }
}

// @param {String} message
World.prototype.announce = function(message) {
    this.broadcast('> ' + message)
}
