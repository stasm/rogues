// vim: ts=2 et sts=2 sw=2

// @param {models.Player} player
var Parser = exports.Parser = function Parser(player) {
  this.player = player;
}

// @param {String} command
Parser.prototype.parse = function parse(command) {
  command = command.split(' ');
  var cmd = command.shift();
  var args = command.join(' ');;
  if ( ! this[cmd]) {
    this.player.send('Unknown command');
    return;
  }
  this[cmd](args);
}

// @param {String} str
Parser.prototype.go = function go(str) {
  if ( ! str) {
    this.player.send('Go where? (north, east, south, west, up, down)');
    return;
  }
  this.player.go(str);
}

// @param {String} str
Parser.prototype.say = function say(str) {
  if ( ! str) {
    this.player.send('Well, say something... nudge nudge.');
    return;
  }
  this.player.say(str);
}

// @param {String} str
Parser.prototype.shout = function shout(str) {
  if ( ! str) {
    this.player.send('Shout something, goddammit!');
    return;
  }
  this.player.shout(str);
}

// @param {String} str
Parser.prototype.radio = function radio(str) {
  if ( ! str) {
    this.player.send('Sure you know how to operate this radio? Say something?');
    return;
  }
  this.player.broadcast(str);
}
