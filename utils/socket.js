const Server = require('socket.io');
const io = Server();

var Socket = {
    emit: function (event, data) {
        console.log(event);
        io.sockets.emit(event, data);
    },
    emitTo: function(event, data, user) {
        console.log(event);
        if(user.name == 'consultorio1'){
            io.sockets.emit('consultorio1LogOut', data);

        } else if(user.name == 'consultorio2') {
            io.sockets.emit('consultorio2LogOut', data);

        }else if(user.name == 'consultorio3') {
            io.sockets.emit('consultorio3LogOut', data);

        }else if(user.name == 'eletro') {
            io.sockets.emit('eletroLogOut', data);

        }else if(user.name == 'medicacao') {
            io.sockets.emit('medicacaoLogOut', data);

        }else if(user.name == 'triagem') {
            io.sockets.emit('triagemLogOut', data);

        }else if(user.name == 'recepcao') {
            io.sockets.emit('recepcaoLogOut', data);
            
        }
        
        
    },
    clients: function findClientsSocket(roomId, namespace) {
        var res = []
        // the default namespace is "/"
        , ns = io.of(namespace ||"/");
    
        if (ns) {
            for (var id in ns.connected) {
                if(roomId) {
                    var index = ns.connected[id].rooms.indexOf(roomId);
                    if(index !== -1) {
                        res.push(ns.connected[id]);
                    }
                } else {
                    res.push(ns.connected[id]);
                }
            }
        }
        return res;
    }
};

io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on('doubleUserLogOut', (req, res, msg) => {
        // req.flash('error', msg);
        req.logout();
        res.redirect('/login');
    });

});

exports.Socket = Socket;
exports.io = io;