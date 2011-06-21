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
  this.player.go(str);
}

// @param {String} str
Parser.prototype.say = function say(str) {
  this.player.say(str);
}

// @param {String} str
Parser.prototype.shout = function shout(str) {
  this.player.shout(str);
}

// @param {String} str
Parser.prototype.radio = function shout(str) {
  this.player.broadcast(str);
}
