var net = require('net'),
    World = require('./models/world').World,
    Player = require('./models/player').Player;

var world = new World();

net.createServer(function (socket) {
    socket.write('> What will your name be today?\r\n');
    socket.once('data', function (buffer) {
        var name = buffer.toString('utf8').trim();
        var player = new Player(socket, name, world);
    });
}).listen(8008);
