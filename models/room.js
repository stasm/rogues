// vim: ts=2 et sts=2 sw=2

var Area = require('./area').Area;

// @param {models.Area} area - parent area
var Room = exports.Room = function Room(area) {
  this.area = area || null;
  this.players = [];
  this.exits = {
    north: false,
    east: false,
    south: false,
    west: false,
    up: false,
    down: false
  };
}

Room.prototype = Room.delegate(Area.prototype);

// @param {models.Player} player
Room.prototype.addPlayer = function addPlayer(player) {
  this._super.addPlayer.call(this, player);
  this.area.addPlayer(player);
}

// @param {models.Player} player
Room.prototype.removePlayer = function removePlayer(player) {
  this._super.removePlayer.call(this, player);
  this.area.removePlayer(player);
}

// @param {models.Room} room
// @param {String} direction
Room.prototype.link = function link(room, direction) {
  this.exits[direction] = room;
  room.exits[reverse(direction)] = this;
}

// @param {String} direction
var reverse = exports.reverse = function reverse(direction) {
  var pairs = {
    'north': 'south',
    'east': 'west',
    'south': 'north',
    'west': 'east',
    'up': 'down',
    'down': 'up'
  };
  return pairs[direction];
}
