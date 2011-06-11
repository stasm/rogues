// @param {net.Socket} socket
// @param {String} name
// @param {models.World} world
var Player = exports.Player = function(socket, name, world) {
    this.socket = socket;
    this.socket.setEncoding('utf8');
    this.name = name || "Anonymous Coward";
    this.world = world;
    this.world.addPlayer(this);

    var self = this;
    this.socket.on('data', function (string) {
        var message = string.trim();
        self.broadcast(self.name + ' says: ' + message);
        self.send('> you say: ' + message);
    });
    this.socket.on('end', function() {
        self.world.removePlayer(self);
    });
}

// @param {String} message
Player.prototype.send = function(message) {
    this.socket.write(message.trim() + '\r\n');
}

// @param {String} message
Player.prototype.broadcast = function(message) {
    this.world.broadcast(message, this);
}
