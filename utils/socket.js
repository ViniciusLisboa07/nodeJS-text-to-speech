const Server = require('socket.io');
const io = Server();

var Socket = {
    emit: function (event, data) {
        console.log(event);
        io.sockets.emit(event, data);
    },
    emitTo: function(event, data, id) {
        console.log(event);
        io.sockets.to(id).emit(event, data);
    }

};

io.on("connection", function (socket) {
    console.log("A user connected");
});


exports.Socket = Socket;
exports.io = io;