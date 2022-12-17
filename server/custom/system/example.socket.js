const { Server }            = require('socket.io');
const io                    = new Server({
    cors: {
        origin: "http://localhost:9000",
        credentials: true
    }
});

module.exports  = ( app ) => {
    io.attach(app);
    console.log('socket io attached');
   
    io.on("connection", (socket) => {
        sock = socket;
        io.socket = socket;
        console.log('socket connected');
    
    });

    io.on("disconnect", (socket) => {
        console.log('socket disconnected');
    });

    return io
}

