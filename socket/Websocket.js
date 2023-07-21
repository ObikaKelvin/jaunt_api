const {
    notificationSend,
    notificationRead
} = require('./handlers/notificationHandlers');

const {
    NOTIFICATION_SEND,
    NOTIFICATION_READ
} = require('../constants/socketEvents');


class Websocket{
    constructor(socket){
        this.user = socket.request.user
        this.socket = socket;
        this.token = socket ? socket.request.headers.authorization : null;
    }

    init(){
        const userData = {
            userId: this.user.phoneNumber,
            socketId: this.socket.id
        };
        global.socketUsers.push(userData)
        this.socket.join(this.user.phoneNumber);
        console.log('connected to socket');
        console.log(this.user);
        this.setUpEvents();
    }

    async setUpEvents(){
        this.socket.emit('signInSuccess', this.user);
                
        this.socket.on(NOTIFICATION_SEND, notificationSend);
        // this.socket.on(NOTIFICATION_READ, notificationRead(this.socket));
        this.socket.on('disconnect', (data) => {
            console.log('left')
        });
    }
}

module.exports = Websocket;