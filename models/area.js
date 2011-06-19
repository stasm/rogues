// vim: ts=2 et sts=2 sw=2

// @param {models.Area} area - parent area
var Area = exports.Area = function Area(area) {
  this.area = area || null;
  this.players = [];
}

// @param {models.Player} player
Area.prototype.addPlayer = function addPlayer(player) {
  if (this.players.indexOf(player) > -1)
    return;
  this.players.push(player);
  if (this.area)
    this.area.addPlayer(player);
}

// @param {models.Player} player
Area.prototype.removePlayer = function removePlayer(player) {
  this.players.splice(this.players.indexOf(player), 1);
  if (this.area)
    this.area.removePlayer(player);
}

// @param {String} message
// @param {models.Player} excluding
Area.prototype.broadcast = function broadcast(message, excluding) {
  for (var p, i=0; p = this.players[i]; i++) {
    if (p == excluding)
      continue
    p.send(message)
  }
}
