const { Server }            = require('socket.io');
const dotenv                = require('dotenv')
dotenv.config({ path: './.env' })

let options = null
if ( process.env.DEV )
    options = {
        cors: {
            origin: `${ process.env.DEV ? 'http' : 'https' }://${process.env.SERVER_HOST}:${process.env.CLIENT_PORT}`,
            credentials: true
        }
    }

const io                    = new Server(options);

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

