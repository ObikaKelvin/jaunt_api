const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const wrap = require('./utils/middlewareWrapper');
const ProtectRoute = require('./middlewares/ProtectRoute');
const socketEvents = require("./constants/socketEvents");
const { notificationSend, notificationRead } = require('./socket/handlers/notificationHandlers');
const Websocket = require('./socket/Websocket');

const httpServer = require("http").createServer(app);

const io  = require('socket.io')(httpServer,{
    cors: {
      origin: '*',
    }
});

io.of('/api/v1').use(wrap(ProtectRoute));

io.of('/api/v1').on('connection', socket => {
    const webSocket = new Websocket(socket);
    webSocket.init();
});

global.io = io;
global.socketUsers = [];

// io.use(wrap(ProtectRoute));

// io.on('connection', socket => {
//     console.log(notificationSend(socket))

//     socket.on(socketEvents.NOTIFICATION_SEND, notificationSend(socket))
//     // socket.on(socketEvents.NOTIFICATION_READ, notificationRead(socket))

// });

// configure app to use .env file
dotenv.config();

// get port from env file
const { PORT } = process.env;

// connect to database
let DB = process.env.DEV_DB_URI

if(process.env.NODE_ENV === "production") {
    DB = process.env.PROD_DB_URI.replace(
        '<password>',
        process.env.PROD_DB_PASSWORD
    ); 
}

// listen to desired port
httpServer.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
    console.log(DB)

    try {

        mongoose.set('strictQuery', true)
        mongoose.connect(
            DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,                
            }
        ).then(() => console.log(" Database is connected"))
        .catch(e => console.log(e))
    
    } catch (e) {
        console.log("could not connect");
    }
})