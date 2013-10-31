var piblaster = require('pi-blaster.js');
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/webapp.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('changeColor', function (data) {
    var color = data.split('=')[0];
    var value = Number(data.split('=')[1]);

    var pin;

    if (color == "R")
        pin = 2;
    else if (color = "G")
        pin = 5;
    else if (color = "B")
        ping = 6;
    else
        return console.error("Wrong color");

    if (value < 0 || value > 1)
        return console.error("Wrong value");

    console.log("Changing color %s to %d", color, value);

    piblaster.setPwn(pin, value);
  });
});
